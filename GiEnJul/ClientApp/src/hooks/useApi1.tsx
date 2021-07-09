import React from 'react'

//Example from Antonio

function useApi1() {

        /*
            Here you could define headers or things that are constant

            also creating a standard fetch, post, put and delete function
        */

        /**
         * Returns a promise to fetch a ____.
         * @param docNo Document number
         */
        async function getData() {
            return await get(url).then(res => return res.data);
        }

        /**
         * Returns a promise to create a new User.
         * @param param1, payload
         * @param param2, userId
         */
        async function update(param1: string, param2: number) {
            if (!param2) {
                throw Error("ID was not found");
            }
            const url = generateUrl(
                param2,
            );
            return put(url, param1);
        }


        /**
         * Returns a promise to update user ___.
         * @param param1, payload
         * @param param2, userId
         */
        async function createNew(param1, param2) {
            const url = generateUrl(param2);
            return post(url, param1);
        }

        /**
         * Returns a promise to delete a given annotation.
         * @param param1 userId
         */
        async function deleteUser(param1) {
            const url = generateUrl(param1)
            return deleteCall(url);
        }


    return {
        getData, createNew, update, deleteUser

    }
}

export default useApi1
