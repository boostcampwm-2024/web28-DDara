import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'DDara API',
    version: '1.0.0',
    description: 'API documentation for DDara Project',
  },
  servers: [
    {
      url: 'http://localhost:3001/api',
    },
  ],
  components: {
    schemas: {
      // 로그인 요청 스키마
      LoginRequest: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: '사용자 ID',
          },
          password: {
            type: 'string',
            description: '사용자 비밀번호',
          },
        },
      },
      // 로그인 응답 스키마
      LoginResponse: {
        type: 'object',
        properties: {
          token: {
            type: 'string',
            description: '인증 토큰',
          },
          userId: {
            type: 'string',
            description: '사용자 ID',
          },
        },
      },

      // 채널 생성 요청 스키마
      CreateChannelRequest: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: '채널 이름',
          },
          host_id: {
            type: 'string',
            description: '채널의 호스트 ID (user 테이블의 ID)',
          },
          guests: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: '게스트의 이름',
                },
                start_location: {
                  type: 'object',
                  properties: {
                    lat: {
                      type: 'number',
                      description: '출발지 마커의 위도',
                    },
                    lng: {
                      type: 'number',
                      description: '출발지 마커의 경도',
                    },
                  },
                },
                end_location: {
                  type: 'object',
                  properties: {
                    lat: {
                      type: 'number',
                      description: '도착지 마커의 위도',
                    },
                    lng: {
                      type: 'number',
                      description: '도착지 마커의 경도',
                    },
                  },
                },
                path: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      lat: {
                        type: 'number',
                        description: '경로 n번째 지점의 위도',
                      },
                      lng: {
                        type: 'number',
                        description: '경로 n번째 지점의 경도',
                      },
                    },
                  },
                  description: '해당 사용자의 경로 (위도, 경도)를 담은 배열',
                },
                marker_style: {
                  type: 'object',
                  properties: {
                    color: {
                      type: 'string',
                      description: '사용자 구분 색상 스타일',
                    },
                  },
                },
              },
            },
            description: '채널의 사용자 object를 담은 배열',
          },
        },
      },

      // 채널 생성 응답 스키마
      CreateChannelResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: '생성된 채널의 고유 ID (UUID 형태)',
          },
          name: {
            type: 'string',
            description: '생성된 채널의 이름',
          },
          host_id: {
            type: 'string',
            description: '생성된 채널의 host ID (user 테이블의 ID)',
          },
          guests: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  description: '생성된 채널의 guest ID (UUID 타입)',
                },
                name: {
                  type: 'string',
                  description: '생성된 채널의 guest 이름',
                },
              },
            },
            description: '생성된 채널의 guest 배열',
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            description: '채널 생성 시각',
          },
        },
      },
    },
  },
  paths: {
    '/login': {
      post: {
        summary: '사용자 로그인 API',
        description: '사용자가 로그인할 수 있도록 ID와 비밀번호를 통해 인증 후 토큰을 반환합니다.',
        operationId: 'login',
        requestBody: {
          description: '로그인을 위한 ID와 비밀번호를 포함한 요청 body',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LoginRequest',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: '로그인 성공, 토큰 및 사용자 정보 반환',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/LoginResponse',
                },
              },
            },
          },
          400: {
            description: '잘못된 요청, 필수 정보 누락 또는 형식 오류',
          },
          401: {
            description: '잘못된 ID나 비밀번호',
          },
          500: {
            description: '서버 에러',
          },
        },
      },
    },
    '/channels': {
      post: {
        summary: '새로운 채널 생성 API',
        description: '채널 이름, 주인, 게스트 정보를 포함하여 채널을 생성합니다.',
        operationId: 'createChannel',
        requestBody: {
          description: '채널 생성에 필요한 데이터',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateChannelRequest',
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: '채널 생성 성공',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CreateChannelResponse',
                },
              },
            },
          },
          400: {
            description: '입력 데이터 유효성 검증 실패',
          },
          500: {
            description: '서버 에러',
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

export const specs = swaggerJSDoc(options);
