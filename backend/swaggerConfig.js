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

      // 회원가입 요청 스키마
      RegisterRequest: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: '사용자 고유 ID (중복 불가)',
          },
          name: {
            type: 'string',
            description: '사용자 이름',
          },
          password: {
            type: 'string',
            description: '사용자 비밀번호 (최소 6자 이상)',
          },
          email: {
            type: 'string',
            format: 'email',
            description: '사용자 이메일 주소',
          },
        },
        required: ['id', 'name', 'password', 'email'],
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
      // 게스트 추가 요청 스키마
      AddGuestRequest: {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            description: '채널 ID (UUID 형태)',
          },
          guest: {
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
                description: '게스트의 경로 (위도, 경도)를 담은 배열',
              },
              marker_style: {
                type: 'object',
                properties: {
                  color: {
                    type: 'string',
                    description: '게스트를 구분하는 색상 스타일',
                  },
                },
              },
            },
          },
        },
      },

      // 게스트 추가 응답 스키마
      AddGuestResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            description: '요청이 성공적으로 처리되었는지 여부',
          },
          message: {
            type: 'string',
            description: '응답 메시지',
          },
        },
      },

      // 채널 정보 가져오기 응답 스키마
      ChannelResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: '채널 ID (UUID 형태)',
          },
          name: {
            type: 'string',
            description: '채널 이름',
          },
          host_id: {
            type: 'string',
            description: '채널의 호스트 ID',
          },
          guests: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  description: '게스트 ID (UUID 형태)',
                },
                name: {
                  type: 'string',
                  description: '게스트 이름',
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
                  description: '게스트의 경로를 나타내는 배열',
                },
                marker_style: {
                  type: 'object',
                  properties: {
                    color: {
                      type: 'string',
                      description: '게스트를 구분하는 색상 스타일',
                    },
                  },
                  description: '게스트 마커의 스타일 정보',
                },
              },
            },
            description: '해당 채널의 게스트 목록',
          },
        },
      },

      // 특정 게스트의 정보 가져오기 응답 스키마
      GuestResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: '게스트의 ID (UUID 형식)',
          },
          name: {
            type: 'string',
            description: '게스트 이름',
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
            description: '출발 위치 정보',
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
            description: '도착 위치 정보',
          },
          path: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                lat: {
                  type: 'number',
                  description: '경로 지점의 위도',
                },
                lng: {
                  type: 'number',
                  description: '경로 지점의 경도',
                },
              },
            },
            description: '게스트의 경로 (위도, 경도)를 담은 배열',
          },
          marker_style: {
            type: 'object',
            properties: {
              color: {
                type: 'string',
                description: '게스트를 구분하는 색상 스타일',
              },
            },
            description: '마커 스타일 정보',
          },
        },
        description: '특정 게스트의 정보',
      },

      // 사용자별 채널 가져오기 응답 스키마
      GetUserChannelsResponse: {
        type: 'object',
        properties: {
          channels: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                generated_at: { type: 'string', format: 'date-time' },
                guest_count: { type: 'number' },
              },
              required: ['id', 'name', 'generated_at'],
            },
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/**/*.js'],
};

export const specs = swaggerJSDoc(options);
