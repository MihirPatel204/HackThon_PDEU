import mongoose, { Document, Schema } from 'mongoose';
import { CreditBureau } from './CreditReport';

export enum AggregationMethod {
  AVERAGE = 'average',
  WEIGHTED = 'weighted',
  LOWEST = 'lowest',
  HIGHEST = 'highest',
  MEDIAN = 'median',
  CUSTOM = 'custom'
}

export interface IScoreComponent {
  bureau: CreditBureau;
  score: number;
  weight: number;
  reportId: mongoose.Types.ObjectId;
}

export interface IAggregatedCreditScore extends Document {
  userId: mongoose.Types.ObjectId;
  aggregatedScore: number;
  method: AggregationMethod;
  components: IScoreComponent[];
  riskCategory: string;
  recommendation: string;
  aggregationDate: Date;
  missingBureaus: CreditBureau[];
  createdAt: Date;
  updatedAt: Date;
}

const AggregatedCreditScoreSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    aggregatedScore: { type: Number, required: true },
    method: { 
      type: String, 
      enum: Object.values(AggregationMethod), 
      required: true 
    },
    components: [{
      bureau: { 
        type: String, 
        enum: Object.values(CreditBureau), 
        required: true 
      },
      score: { type: Number, required: true },
      weight: { type: Number, required: true },
      reportId: { type: Schema.Types.ObjectId, ref: 'CreditReport', required: true }
    }],
    riskCategory: { 
      type: String, 
      enum: ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor', 'Very Poor'],
      required: true
    },
    recommendation: { type: String },
    aggregationDate: { type: Date, default: Date.now },
    missingBureaus: [{ 
      type: String, 
      enum: Object.values(CreditBureau) 
    }]
  },
  {
    timestamps: true
  }
);

// Index for fast lookups by user
AggregatedCreditScoreSchema.index({ userId: 1, aggregationDate: -1 });

export default mongoose.model<IAggregatedCreditScore>('AggregatedCreditScore', AggregatedCreditScoreSchema); 