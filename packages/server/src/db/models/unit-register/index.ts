import mongoose from 'mongoose'
import { ENRegisteredUnit } from '../../../types/unit-register/index'

const Schema = mongoose.Schema
const UnitRegister = new Schema<ENRegisteredUnit>({
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
    exists: {
      type: Boolean,
      required: true
    },
    url: {
      type: String,
      required: false
    }
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

export default mongoose.model('en-units', UnitRegister)