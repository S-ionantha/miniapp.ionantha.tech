module.exports = {
  host: process.env.NODE_ENV == 'production' ? 'localhost' : '39.96.217.242',
  port: '9200',
  auth:{
    username:'elastic',
    password: ']34YzQhBQc',
  },
  pvUvQuery: {
    version: true,
    size: 0,
    sort: [
      {
        '@timestamp': {
          order: 'desc',
          unmapped_type: 'boolean',
        },
      },
    ],
    aggs: {
      '2': {
        date_histogram: {
          field: '@timestamp',
          calendar_interval: '1d',
          format: 'yyyy-MM-dd',
          time_zone: 'Asia/Shanghai',
          min_doc_count: 1,
        },
        aggs: {
          uv: {
            cardinality: {
              field: 'uid.keyword',
            },
          },
        },
      },
    },
    docvalue_fields: [
      {
        field: '@timestamp',
        format: 'date_time',
      },
    ],
    query: {
      bool: {
        must: [
          {
            range: {
              '@timestamp': {
                format: 'strict_date_optional_time',
                gte: '2019-12-07T08:23:06.642Z',
                lte: '2020-01-06T08:23:06.642Z',
              },
            },
          },
        ],
      },
    },
  },
  articleEvent: {
    size: 0,
    aggs: {
      event: {
        terms: {
          field: 'event.keyword',
          size: 10,
        },
      },
    },
    query: {
      bool: {
        must: [
          {
            range: {
              '@timestamp': {
                format: 'strict_date_optional_time',
                gte: '2019-12-07T08:23:06.642Z',
                lte: '2020-01-06T10:23:06.642Z',
              },
            },
          },
        ],
      },
    },
  },
}
