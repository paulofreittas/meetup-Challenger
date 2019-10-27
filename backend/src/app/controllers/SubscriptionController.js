import { Op } from 'sequelize';
import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';
import Queue from '../../lib/Queue';
import SendMail from '../jobs/SendMail';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      attributes: ['id', 'created_at'],
      include: [
        {
          model: Meetup,
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
          required: true,
          attributes: [
            'id',
            'title',
            'description',
            'location',
            'date',
            'user_id',
            'file_id',
          ],
          include: [
            {
              model: File,
              as: 'banner',
              attributes: ['path', 'url'],
            },
            {
              model: User,
              attributes: ['name'],
            },
          ],
        },
      ],
      order: [[Meetup, 'date']],
    });

    return res.json(subscriptions);
  }

  async store(req, res) {
    const meetup = await Meetup.findByPk(req.params.meetupId, {
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
        },
      ],
    });

    if (!meetup) {
      return res.status(400).json({ error: 'Meetup not found' });
    }

    if (meetup.user_id === req.userId) {
      return res
        .status(400)
        .json({ error: 'You not can subscribe in meetup organized by you' });
    }

    if (meetup.past) {
      return res.status(400).json({ error: 'Meetup has already happened' });
    }

    const subscribeExisting = await Subscription.findOne({
      where: {
        meetup_id: meetup.id,
        user_id: req.userId,
      },
    });

    if (subscribeExisting) {
      return res
        .status(400)
        .json({ error: 'You already subscribed in this meetup' });
    }

    const checkDate = await Subscription.findOne({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          required: true,
          where: {
            date: meetup.date,
          },
        },
      ],
    });

    if (meetup.past) {
      return res.status(400).json({ error: 'Meetup has already happened' });
    }

    if (checkDate) {
      return res
        .status(400)
        .json({ error: 'You not subscribe in two meetups with same time' });
    }

    const { id } = await Subscription.create({
      meetup_id: meetup.id,
      user_id: req.userId,
    });

    const subscription = await Subscription.findByPk(id, {
      include: [
        {
          model: Meetup,
          attributes: [
            'id',
            'title',
            'description',
            'date',
            'location',
            'user_id',
          ],
          include: [
            {
              model: User,
              attributes: ['name', 'email'],
            },
          ],
        },
        {
          model: User,
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    await Queue.add(SendMail.key, { subscription });

    return res.status(201).json(subscription);
  }

  async delete(req, res) {
    const subscription = await Subscription.findByPk(req.params.id);

    if (!subscription) {
      return res.status(400).json({ error: 'Subscription not found' });
    }

    if (subscription.user_id !== req.userId) {
      return res.status(401).json({ error: 'Only the user can edit it' });
    }

    await subscription.destroy();

    return res.send();
  }
}

export default new SubscriptionController();
