import db from '../../'
import mongoose, { Model } from 'mongoose'
import { EnUsUnit } from '../../../types/unit-register/index'

export type UnitDbCollection = Model<EnUsUnit, Record<string, unknown>, Record<string, unknown>, Record<string, unknown>>

const Schema = mongoose.Schema

const UnitRegister = new Schema<EnUsUnit>({
  orgNumber: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  organizationForm: {
    code: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: false
    },
    links: {
      type: Array,
      required: false
    }
  },
  regDateOfEntities: {
    type: String,
    required: false
  },
  isRegistereInMvaRegister: {
    type: Boolean,
    required: false
  },
  website: {
    type: Schema.Types.Mixed
  },
  industryCode: {
    description: {
      type: String,
      required: false
    },
    code: {
      type: String,
      required: false
    }
  },
  employees: {
    type: Number,
    required: false
  },
  businessAddress: {
    country: {
      type: String,
      required: false
    },
    countryCode: {
      type: String,
      required: false
    },
    zip: {
      type: String,
      required: false
    },
    postalLocation: {
      type: String,
      required: false
    },
    address: {
      type: Array,
      required: false
    },
    municipality: {
      type: String,
      required: false
    },
    municipalityCode: {
      type: String,
      required: false
    }
  },
  dateOfIncorporation: String,
  institutionalSectorCode: {
    code: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: false
    }
  },
  registeredInTheRegisterOfBusinessEnterprises: {
    type: Boolean,
    required: false
  },
  registeredIinTheFoundationRegister: {
    type: Boolean,
    required: false
  },
  registeredInTheVolunteerRegister: {
    type: Boolean,
    required: false
  },
  bankrupt: {
    type: Boolean,
    required: false
  },
  underSettlement: {
    type: Boolean,
    required: false
  },
  underCompulsoryLiquidationOrCompulsoryDissolution: {
    type: Boolean,
    required: false
  },
  languageTargetForm: {
    type: String,
    required: false
  },
  links: {
    type: Array,
    required: false
  },
  deleted: {
    type: Boolean,
    required: false
  },
  deletedDate: {
    type: String,
    required: false
  }
})

/**
 * @type {Function}
 * @param col
 * @return Mongo Db collection
 */

export default (col: string): UnitDbCollection => mongoose.model(`${col}`, UnitRegister)