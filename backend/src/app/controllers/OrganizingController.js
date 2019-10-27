import Meetup from '../models/Meetup';
import File from '../models/File';

class OrganizingController {
  async index(req, res) {
    const { id } = req.query;

    if (id) {
      const meetup = await Meetup.findByPk(id, {
        attributes: ['id', 'title', 'description', 'location', 'date', 'past'],
        include: [
          {
            model: File,
            as: 'banner',
            attributes: ['id', 'path', 'url'],
          },
        ],
      });

      return res.json(meetup);
    }
    const meetups = await Meetup.findAll({
      where: { user_id: req.userId },
      attributes: ['id', 'title', 'description', 'location', 'date', 'past'],
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
      ],
      order: ['date'],
    });

    return res.json(meetups);
  }
}

export default new OrganizingController();
