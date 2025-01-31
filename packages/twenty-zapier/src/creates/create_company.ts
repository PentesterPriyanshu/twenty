import { Bundle, ZObject } from 'zapier-platform-core';
import handleQueryParams from '../utils/handleQueryParams';

const perform = async (z: ZObject, bundle: Bundle) => {
  const response = await z.request({
    body: {
      query: `
      mutation CreateCompany {
        createOneCompany(
          data:{${handleQueryParams(bundle.inputData)}}
        )
        {id}
      }`,
    },
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.apiKey}`,
    },
    method: 'POST',
    url: `${process.env.SERVER_BASE_URL}/graphql`,
  });
  return response.json;
};
export default {
  display: {
    description: 'Creates a new Company in Twenty',
    hidden: false,
    label: 'Create New Company',
  },
  key: 'create_company',
  noun: 'Company',
  operation: {
    inputFields: [
      {
        key: 'name',
        label: 'Company Name',
        type: 'string',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'address',
        label: 'Address',
        type: 'string',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'domainName',
        label: 'Url',
        type: 'string',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'linkedinUrl',
        label: 'Linkedin',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'xUrl',
        label: 'Twitter',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'annualRecurringRevenue',
        label: 'ARR (Annual Recurring Revenue)',
        type: 'number',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'idealCustomerProfile',
        label: 'ICP (Ideal Customer Profile)',
        type: 'boolean',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'employees',
        label: 'Employees (number of)',
        type: 'number',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      name: 'Apple',
      address: 'Cupertino',
    },
    perform,
  },
};
