import { Product } from '../models/product.model';

export const PRODUCTS_MOCK: Product[] = [
  {
    id: 'p1',
    name: 'عمرة بالإنابة',
    imageUrl: 'assets/images/imgs/products/Umrah%20on%20Behalf%20of%20Someone.png',
    executorDue: 200,
    salePrice: 350,
    expectedDuration: '6 ساعات',
    profit: 100,
    active: true,
    stages: [
      { id: 's1', order: 1, title: 'الإحرام', description: 'عند الميقات، نية الإحرام وتلبية بصوت واضح', videoCount: 1 },
      { id: 's2', order: 2, title: 'الطواف', description: 'أداء الطواف حول الكعبة المشرفة حسب التعليمات', videoCount: 1 },
      { id: 's3', order: 3, title: 'السعي', description: 'السعي بين الصفا والمروة مع توثيق المراحل', videoCount: 1 },
      { id: 's4', order: 4, title: 'الحلق', description: 'الحلق أو التقصير وإتمام مناسك العمرة', videoCount: 1 },
    ],
  },
  {
    id: 'p2',
    name: 'حج مفرد',
    imageUrl: 'assets/images/imgs/products/Individual%20Hajj%20(Ifrad).png',
    executorDue: 850,
    salePrice: 1200,
    expectedDuration: '3 أيام',
    profit: 350,
    active: true,
    stages: [
      { id: 's1', order: 1, title: 'الإحرام', description: 'عند الميقات، نية الإحرام وتلبية بصوت واضح', videoCount: 1 },
      { id: 's2', order: 2, title: 'الطواف', description: 'أداء الطواف حول الكعبة المشرفة حسب التعليمات', videoCount: 1 },
      { id: 's3', order: 3, title: 'السعي', description: 'السعي بين الصفا والمروة مع توثيق المراحل', videoCount: 1 },
      { id: 's4', order: 4, title: 'الحلق', description: 'الحلق أو التقصير وإتمام مناسك العمرة', videoCount: 1 },
    ],
  },
  {
    id: 'p3',
    name: 'طواف بالإنابة',
    imageUrl: 'assets/images/imgs/products/Tawaf%20on%20Behalf%20of%20Someone.png',
    executorDue: 120,
    salePrice: 200,
    expectedDuration: '3 ساعات',
    profit: 80,
    active: true,
    stages: [
      { id: 's1', order: 1, title: 'الإحرام', description: 'عند الميقات، نية الإحرام وتلبية بصوت واضح', videoCount: 1 },
      { id: 's2', order: 2, title: 'الطواف', description: 'أداء الطواف حول الكعبة المشرفة حسب التعليمات', videoCount: 1 },
      { id: 's3', order: 3, title: 'السعي', description: 'السعي بين الصفا والمروة مع توثيق المراحل', videoCount: 1 },
      { id: 's4', order: 4, title: 'الحلق', description: 'الحلق أو التقصير وإتمام مناسك العمرة', videoCount: 1 },
    ],
  },
];
