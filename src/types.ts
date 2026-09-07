export interface DivisionData {
  id: string;
  number: string;
  divisionLabel: string;
  title: string;
  description: string;
  tags: string[];
  features: string[];
  metrics: { label: string; value: string }[];
  accentColor: string;
}

export interface ApproachPrinciple {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  detailPoints: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  division: 'digitals' | 'technologies' | 'both';
  message: string;
}
