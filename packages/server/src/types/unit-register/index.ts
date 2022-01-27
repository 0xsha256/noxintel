export interface NbNoUnit {
  _id?: {
    $oid?: string
  }
  organisasjonsnummer: number
  navn: string
  organisasjonsform: {
    kode: string
    beskrivelse: string
    links: Array<string>
  }
  hjemmeside?: string | undefined
  registreringsdatoEnhetsregisteret: string
  registrertIMvaregisteret: boolean
  naeringskode1: {
    beskrivelse: string
    kode: number
  }
  antallAnsatte: number
  forretningsadresse: {
    land: string
    landkode: string
    postnummer: number
    poststed: string
    adresse: string[]
    kommune: string
    kommunenummer: number
  }
  stiftelsesdato: string,
  institusjonellSektorkode: {
    kode: number
    beskrivelse: string
  }
  registrertIForetaksregisteret: boolean
  registrertIStiftelsesregisteret: boolean
  registrertIFrivillighetsregisteret: boolean
  konkurs: boolean
  underAvvikling: boolean
  underTvangsavviklingEllerTvangsopplosning: boolean
  maalform: string
  links: string[]
}


export interface EnUsUnit {
  _id?: string
  orgNumber: string
  name: string
  organizationForm: {
    code: string
    description: string
    links: string[]
  }
  website?: string | boolean
  regDateOfEntities: string
  isRegistereInMvaRegister: boolean
  industryCode: {
    description: string
    code: string
  }
  employees: number
  businessAddress: {
    country: string
    countryCode: string
    zip: string
    postalLocation: string
    address: object | string[]
    municipality: string
    municipalityCode: string
  }
  dateOfIncorporation: string,
  institutionalSectorCode: {
    code: string
    description: string
  }
  registeredInTheRegisterOfBusinessEnterprises: boolean
  registeredIinTheFoundationRegister: boolean
  registeredInTheVolunteerRegister: boolean
  bankrupt: boolean
  underSettlement: boolean
  underCompulsoryLiquidationOrCompulsoryDissolution: boolean
  languageTargetForm: string
  links: object | string[],
  deleted?: boolean,
  deletedDate?: string
  terminated: boolean
}