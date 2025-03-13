import { iGenericService } from "./iGenericService";
import { iOrder } from "../models/iOrder";

export interface iOrderService extends iGenericService<iOrder> {}
