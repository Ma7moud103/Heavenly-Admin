export interface RoomType {
  id: string;
  name: string;
  price: number;
  created_at?: string;
}

export interface RoomStatus {
  id: string;
  name: string;
  label?: string;
  color?: string;
  created_at?: string;
}

export interface IRoom {
  id: string;
  title?: string;
  base_price: number;
  capacity: number;
  description?: string;
  image_url?: string | null;
  room_type_id?: string;
  status_id?: string;
  created_at?: string;
  room_type?: RoomType | null;
  status?: RoomStatus | null;
}



export interface IRoomsTypes {
  id: string;
  name: string;
  price: number;
  count: number;
}
