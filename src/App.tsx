import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

type LeadForm = {
  customerName: string
  phoneNumber: string
  powerBill: string
  propertyType: string
  street: string
  district: string
  callSlot: string
}

const initialForm: LeadForm = {
  customerName: '',
  phoneNumber: '',
  powerBill: '',
  propertyType: '',
  street: '',
  district: '',
  callSlot: '',
}

const propertyTypes = [
  'Individual House',
  'Apartment',
  'Commercial',
  'Industrial',
]

const callSlots = [
  '9 AM - 12 PM',
  '12 PM - 3 PM',
  '3 PM - 6 PM',
  '6 PM - 8 PM',
]

const googleSheetWebAppUrl = ''

function App() {
  const [form, setForm] = useState<LeadForm>(initialForm)
  const [status, setStatus] = useState<FormStatus>('idle')

  const isConfigured = googleSheetWebAppUrl.trim().length > 0

  const canSubmit = useMemo(
    () =>
      Object.values(form).every((value) => value.trim().length > 0) &&
      status !== 'submitting',
    [form, status],
  )

  const updateField = (field: keyof LeadForm, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
    setStatus('idle')
  }

  const submitLead = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  console.log("SUBMIT CLICKED");
  console.log(form);

  try {
    const response = await fetch("http://localhost:5000/api/enquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    console.log("SUCCESS", data);

    setForm(initialForm);
    setStatus("success");
  } catch (error) {
    console.error("ERROR", error);
    setStatus("error");
  }
};
  return (
    <main className="page-shell">
      <section className="intro-panel" aria-labelledby="form-title">
        <div className="brand-mark">Solarson</div>
        <h1 id="form-title">Solar Enquiry Form</h1>
        <p>
          Share your power bill and property details. Our team will call you in
          your preferred time slot.
        </p>
      </section>

      <form className="lead-form" onSubmit={submitLead}>
        <label>
          <span>Customer Name</span>
          <input
            autoComplete="name"
            name="customerName"
            onChange={(event) => updateField('customerName', event.target.value)}
            placeholder="Enter customer name"
            required
            type="text"
            value={form.customerName}
          />
        </label>

        <label>
          <span>Phone Number</span>
          <input
            autoComplete="tel"
            inputMode="tel"
            name="phoneNumber"
            onChange={(event) => updateField('phoneNumber', event.target.value)}
            pattern="[0-9+\-\s]{8,15}"
            placeholder="Enter phone number"
            required
            type="tel"
            value={form.phoneNumber}
          />
        </label>

        <label>
          <span>How much is your power bill?</span>
          <input
            inputMode="numeric"
            name="powerBill"
            onChange={(event) => updateField('powerBill', event.target.value)}
            placeholder="Monthly bill amount"
            required
            type="text"
            value={form.powerBill}
          />
        </label>

        <label>
          <span>Property Type</span>
          <select
            name="propertyType"
            onChange={(event) => updateField('propertyType', event.target.value)}
            required
            value={form.propertyType}
          >
            <option value="">Select property type</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Street</span>
          <input
            autoComplete="address-line1"
            name="street"
            onChange={(event) => updateField('street', event.target.value)}
            placeholder="Enter street"
            required
            type="text"
            value={form.street}
          />
        </label>

        <label>
          <span>District</span>
          <input
            autoComplete="address-level2"
            name="district"
            onChange={(event) => updateField('district', event.target.value)}
            placeholder="Enter district"
            required
            type="text"
            value={form.district}
          />
        </label>

        <label>
          <span>Possible time slot for phone call</span>
          <select
            name="callSlot"
            onChange={(event) => updateField('callSlot', event.target.value)}
            required
            value={form.callSlot}
          >
            <option value="">Select call time</option>
            {callSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </label>

        <button disabled={!canSubmit} type="submit">
          {status === 'submitting' ? 'Saving...' : 'Submit Enquiry'}
        </button>

        {status === 'success' && (
          <p className="message success">
            Thank you. Your enquiry has been saved.
          </p>
        )}

        {status === 'error' && (
          <p className="message error">
            Please fill all required details and try again.
          </p>
        )}
      </form>
    </main>
  )
}

export default App
