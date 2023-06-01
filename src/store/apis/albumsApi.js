import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

const albumsApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
  }),
  endpoints(builder) {
    return {
      removeAlbum: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          return [{ type: 'Album', id: arg.userId }]
        },
        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            method: 'DELETE'
          }
        }
      }),

      addAlbum: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          return [{ type: 'Album', id: arg.id }]
        },
        query: (user) => {
          return {
            url: "/albums",
            method: "POST",
            body: {
              userId: user.id,
              title: faker.commerce.productName(),
            },
          };
        },
      }),

      fetchAlbums: builder.query({
        providesTags: (result, error, arg) => {
          return [{ type: 'Album', id: arg.id }]
        },
        query: (user) => {
          return {
            url: "/albums",
            params: {
              userId: user.id,
            },
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } = albumsApi;
export { albumsApi };
