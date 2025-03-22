import mongoose, { Document, Schema } from 'mongoose';

export enum CreditBureau {
  EXPERIAN = 'experian',
  EQUIFAX = 'equifax',
  TRANSUNION = 'transunion'
}

export interface ICreditReportData {
  creditScore: number;
  utilizationRate: number;
  accountsCount: number;
  delinquentAccountsCount: number;
  inquiriesLast6Months: number;
  oldestAccountAge: number; // in months
  totalDebt: number;
  monthlyPayments: number;
  publicRecords: number;
  derogativeMarks: number;
  paymentHistory: {
    onTime: number;
    late30Days: number;
    late60Days: number;
    late90Days: number;
  };
  creditMix: {
    revolvingAccounts: number;
    installmentAccounts: number;
    mortgageAccounts: number;
    openAccounts: number;
  };
  additionalData: Record<string, any>;
}

export interface ICreditReport extends Document {
  userId: mongoose.Types.ObjectId;
  bureau: CreditBureau;
  reportDate: Date;
  reportId: string;
  data: ICreditReportData;
  isAvailable: boolean;
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CreditReportSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bureau: { 
      type: String, 
      enum: Object.values(CreditBureau), 
      required: true 
    },
    reportDate: { type: Date, default: Date.now },
    reportId: { type: String, required: true },
    data: {
      creditScore: { type: Number },
      utilizationRate: { type: Number },
      accountsCount: { type: Number },
      delinquentAccountsCount: { type: Number },
      inquiriesLast6Months: { type: Number },
      oldestAccountAge: { type: Number },
      totalDebt: { type: Number },
      monthlyPayments: { type: Number },
      publicRecords: { type: Number },
      derogativeMarks: { type: Number },
      paymentHistory: {
        onTime: { type: Number },
        late30Days: { type: Number },
        late60Days: { type: Number },
        late90Days: { type: Number }
      },
      creditMix: {
        revolvingAccounts: { type: Number },
        installmentAccounts: { type: Number },
        mortgageAccounts: { type: Number },
        openAccounts: { type: Number }
      },
      additionalData: { type: Schema.Types.Mixed }
    },
    isAvailable: { type: Boolean, default: true },
    errorMessage: { type: String }
  },
  {
    timestamps: true
  }
);

// Compound index for query optimization
CreditReportSchema.index({ userId: 1, bureau: 1, reportDate: -1 });

export default mongoose.model<ICreditReport>('CreditReport', CreditReportSchema); 