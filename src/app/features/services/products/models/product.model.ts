export interface ProductStage {
  id: string;
  order: number;
  title: string;
  description: string;
  videoCount: number;
}

export interface Product {
  id: string;
  name: string;
  imageUrl?: string;
  executorDue: number;
  salePrice: number;
  expectedDuration: string;
  profit: number;
  active?: boolean;
  stages?: ProductStage[];
}
