


let nameRegex = /^[.a-zA-Z\s]+$/;
let phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
let emailRegex = /^[a-z]{1}[a-z0-9._]{1,100}[@]{1}[a-z]{2,15}[.]{1}[a-z]{2,10}$/;
let statusRegex = /^(success|failed|pending)$/
let passRegex =  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/;
let sectionRegex = /^(Select All|Select All Users|Select All Vendors|Specific Host)$/
let documentStatusRegex = /^(Verify|Reject)$/
let SubscriptionStatusRegex = /^(Active|Deactive)$/
let planValidityRegex = /^(Monthly|Quarterly|Yearly)$/
const pinRegex = /^\d{6}$/;


module.exports = {
  passRegex,
  documentStatusRegex,
  sectionRegex,
  SubscriptionStatusRegex,
  planValidityRegex,
  emailRegex,
  phoneRegex,
  pinRegex
};
