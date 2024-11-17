export interface MongoSearchQuery {
  [field: string]: {
    $regex: string;
    $options?: string;
  }
};
