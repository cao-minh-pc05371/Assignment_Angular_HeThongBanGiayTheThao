export interface IProductVariant {
    id: number;
    product_id: number;
    size_id: number;
    color_id: number;
    stock: number;
    createdAt?: string;  // Thêm trường này nếu bạn muốn theo dõi thời gian tạo
    updatedAt?: string;  // Thêm trường này nếu bạn muốn theo dõi thời gian cập nhật
    size?: {
      size_label: string;
    };
    color?: {
      color_name: string;
    };
  }
  