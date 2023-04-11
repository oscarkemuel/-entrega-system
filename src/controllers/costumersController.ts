import { Request, Response } from 'express';
import { CustomersService } from '../services/customersService';

class CustumersController {
  private custumersService = new CustomersService();

  async create(req: Request, res: Response) {
    const { phone } = req.body;
    const user = req.user;

    const newCustomer = await this.custumersService.create({phone, userId: user.id});

    return res.status(201).json({ customer: newCustomer });
  }

  async createPlace(req: Request, res: Response) {
    const { name, address } = req.body;
    const user = req.user;

    const place = await this.custumersService.createPlace({name, address, userId: user.id});

    return res.status(201).json({ place });
  }

  async showPlaces(req: Request, res: Response) {
    const user = req.user;

    const places = await this.custumersService.showPlaces(user.id);

    return res.status(200).json({ places });
  }

  async findPlace(req: Request, res: Response) {
    const { placeId } = req.params;

    const place = await this.custumersService.findPlace(placeId);

    return res.status(200).json({ place });
  }

  async deletePlace(req: Request, res: Response) {
    const { placeId } = req.params;

    await this.custumersService.deletePlace(placeId);

    return res.status(204).json();
  }

  async updatePlace(req: Request, res: Response) {
    const { placeId } = req.params;
    const { name, address } = req.body;

    const place = await this.custumersService.updatePlace(placeId, {name, address, userId: req.user.id});

    return res.status(200).json({ place });
  }

  async createDeliveryRequest(req: Request, res: Response) {
    const { placeId, productId, quantity } = req.body;

    const deliveryRequest = await this.custumersService.createDeliveryRequest({
      customerId: req.user.id,
      placeId,
      productId,
      quantity,
      delivery_time: new Date(),
      sellerId: '',
      status: ''
    });

    return res.status(201).json({ deliveryRequest });
  }

  async showMyDeliveryRequests(req: Request, res: Response) {
    const deliveryRequests = await this.custumersService.showMyDeliveryRequests(req.user.id);

    return res.status(200).json({ deliveryRequests });
  }
}

export { CustumersController };