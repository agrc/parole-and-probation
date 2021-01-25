import { sqlMapper } from './Filters';

describe('sqlMapper', () => {
  describe('agent', () => {
    it('maps filter data', () => {
      const actual = sqlMapper({
        agent: {
          loggedInUser: {
            value: 'yolo',
            id: -1,
          },
          agentList: [
            {
              value: 'yolo',
              id: -1,
            },
          ],
          vanity: true,
        },
      });

      expect(actual.definitionExpression[0]).toBe('agent_id in (-1)');
      expect(actual.definitionExpression.length).toBe(1);
      expect(actual.filter.length).toBe(0);
    });

    it('ignores default values', () => {
      const actual = sqlMapper({
        agent: {
          loggedInUser: null,
          agentList: [],
          vanity: true,
        },
      });

      expect(actual.filter.length).toBe(0);
      expect(actual.definitionExpression.length).toBe(0);
    });
  });

  describe('date', () => {
    it('maps days since filters', () => {
      const actual = sqlMapper({
        date: {
          attempt: 30,
          office: 60,
          success: 180,
          compliant: null,
        },
      });

      expect(actual.filter[0]).toBe('last_attempted_field_contact>30');
      expect(actual.filter[1]).toBe('last_office_contact>60');
      expect(actual.filter[2]).toBe('last_successful_field_contact>180');
      expect(actual.filter.length).toBe(3);
      expect(actual.definitionExpression.length).toBe(0);
    });

    it('ignores compliance', () => {
      const actual = sqlMapper({
        date: {
          compliant: 'in',
        },
      });

      expect(actual.filter[0]).toBe('in_compliance=1');
      expect(actual.filter.length).toBe(1);
      expect(actual.definitionExpression.length).toBe(0);
    });

    it('ignores default values', () => {
      const actual = sqlMapper({
        date: {
          compliant: null,
          office: null,
          attempt: null,
          success: null,
        },
      });

      expect(actual.filter.length).toBe(0);
      expect(actual.definitionExpression.length).toBe(0);
    });
  });

  describe('location', () => {
    it('ignores default values', () => {
      const actual = sqlMapper({
        location: {
          region: [],
          zip: '',
          city: '',
          counties: [],
        },
      });

      expect(actual.filter.length).toBe(0);
      expect(actual.definitionExpression.length).toBe(0);
    });

    it('maps filter values', () => {
      const actual = sqlMapper({
        location: {
          region: [1, 2, 3],
          zip: 84124,
          city: 'Salt Lake City',
          counties: ['Salt Lake'],
        },
      });

      expect(actual.filter.length).toBe(4);
      expect(actual.filter[0]).toBe('region in (1,2,3)');
      expect(actual.filter[1]).toBe('zip=84124');
      expect(actual.filter[2]).toBe("city='SALT LAKE CITY'");
      expect(actual.filter[3]).toBe("county in ('SALT LAKE')");
      expect(actual.definitionExpression.length).toBe(0);
    });
  });

  describe('offender', () => {
    it('ignores default values', () => {
      const actual = sqlMapper({
        offender: {
          gender: '',
          name: '',
          number: '',
          tel: '',
          employer: '',
        },
      });

      expect(actual.filter.length).toBe(0);
      expect(actual.definitionExpression.length).toBe(0);
    });

    it('maps offender filter', () => {
      const actual = sqlMapper({
        offender: {
          gender: 'M',
          name: 'Yours Truly',
          number: 123123,
          tel: '801-111-1111',
          employer: 'Mr Jobs',
        },
      });

      expect(actual.filter.length).toBe(5);
      expect(actual.filter[0]).toBe("gender='M'");
      expect(actual.filter[1]).toBe("offender='YOURS TRULY'");
      expect(actual.filter[2]).toBe('offender_id=123123');
      expect(actual.filter[3]).toBe("offender_phone='801-111-1111'");
      expect(actual.filter[4]).toBe("employer='MR JOBS'");
      expect(actual.definitionExpression.length).toBe(0);
    });

    it('escapes single quotes', () => {
      const actual = sqlMapper({
        offender: {
          gender: 'M',
          name: "Your's Truly's",
          number: 123123,
          tel: '801-111-1111',
          employer: "Mr Job's",
        },
      });

      expect(actual.filter.length).toBe(5);
      expect(actual.filter[0]).toBe("gender='M'");
      expect(actual.filter[1]).toBe("offender='YOUR''S TRULY''S'");
      expect(actual.filter[2]).toBe('offender_id=123123');
      expect(actual.filter[3]).toBe("offender_phone='801-111-1111'");
      expect(actual.filter[4]).toBe("employer='MR JOB''S'");
      expect(actual.definitionExpression.length).toBe(0);
    });
  });

  describe('other', () => {
    it('ignores default values', () => {
      const actual = sqlMapper({
        other: {
          warrant: '',
          status: '',
          sos: [],
          supervision: [],
          gang: [],
          offense: [],
        },
      });

      expect(actual.filter.length).toBe(0);
      expect(actual.definitionExpression.length).toBe(0);
    });

    it('maps ignores other default values', () => {
      const actual = sqlMapper({
        other: {
          warrant: 'Yes',
          status: 'probation',
          sos: ['mod', 'no std'],
          supervision: [
            { name: 'EM', id: 'EM', default: true },
            { name: 'GPS', id: 'GPS', default: true },
          ],
          gang: [{ name: 'omg', id: 3 }],
          offense: [{ name: 'sex', id: 'E' }],
        },
      });

      expect(actual.filter.length).toBe(6);
      expect(actual.filter[0]).toBe('active_warrant=1');
      expect(actual.filter[1]).toBe("legal_status='PROBATION'");
      expect(actual.filter[2]).toBe("standard_of_supervision is null OR standard_of_supervision in ('MOD')");
      expect(actual.filter[3]).toBe("special_supervision='EM, GPS'");
      expect(actual.filter[4]).toBe("gang_type in ('OMG')");
      expect(actual.filter[5]).toBe("offense_code in ('E')");
      expect(actual.definitionExpression.length).toBe(0);
    });

    it('orders special supervisions', () => {
      const payload = [
        {
          name: 'EM',
          id: 'EM',
          default: true,
          sortKey: 8,
        },
        {
          name: 'SO',
          id: 'SO',
          default: true,
          sortKey: 2,
        },
        {
          name: 'SO-A',
          id: 'SO-A',
          default: true,
          sortKey: 18,
        },
        {
          name: 'SO-B',
          id: 'SO-B',
          default: true,
          sortKey: 19,
        },
        {
          name: 'SO-C',
          id: 'SO-C',
          default: true,
          sortKey: 22,
        },
        {
          name: 'DORA',
          id: 'DORA',
          default: true,
          sortKey: 1,
        },
        {
          name: 'ECR',
          id: 'ECR',
          default: true,
          sortKey: 17,
        },
        {
          name: 'FOSI',
          id: 'FOSI',
          default: true,
          sortKey: 21,
        },
        {
          name: 'IG INT',
          id: 'IG INT',
          default: true,
          sortKey: 20,
        },
        {
          name: 'MIO',
          id: 'MIO',
          default: true,
          sortKey: 10,
        },
      ];

      const actual = sqlMapper({
        other: {
          supervision: payload,
        },
      });

      expect(actual.filter[0]).toBe("special_supervision='DORA, SO, EM, MIO, ECR, SO-A, SO-B, IG INT, FOSI, SO-C'");
    });
  });
});
