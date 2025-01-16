import { expect, test } from '@playwright/test'

interface ICreationResponse {
    name?: string;
    job?: string;
    id?: string;
    createdAt?: string;
}

interface IReponse{
    name?:string;
    job?:string;
    updatedAt?:string
}

test.describe('API Test Block', () => {

    const baseURL = 'https://reqres.in'

    test('Validate getting a single user by API call (GET)', async ({ request }) => {

        const responseUserId2Data = {
            data: {
                id: 2,
                email: 'janet.weaver@reqres.in',
                first_name: 'Janet',
                last_name: 'Weaver',
                avatar: 'https://reqres.in/img/faces/2-image.jpg'
            },
            support: {
                url: 'https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral',
                text: 'Tired of writing endless social media content? Let Content Caddy generate it for you.'
            }
        }
        const singleUserResponse = await request.get(`${baseURL}/api/users/2`)
        console.log('RESPONSE JSON ', await singleUserResponse.json());
        expect(singleUserResponse.status()).toEqual(200)
        expect(singleUserResponse.statusText()).toBe('OK')
        expect(await singleUserResponse.json()).toEqual(responseUserId2Data)
    })

    test('Validate user creation by api call (POST)', async ({ request }) => {
        const data = {
            "name": "James",
            "job": "developer"
        }

        const resp = {
            "name": "James",
            "job": "developer",
            "id": "88",
            "createdAt": "2025-01-16T08:18:58.997Z"
        }
        const userCreationResponse = await request.post(`${baseURL}/api/users`, { data })
        expect(userCreationResponse.status()).toEqual(201)
        expect(userCreationResponse.statusText()).toBe('Created')
        const jsonResponse: ICreationResponse = await userCreationResponse.json()
        expect(jsonResponse.name).toEqual(data.name)
        expect(jsonResponse.job).toEqual(data.job)
        expect(jsonResponse.createdAt).toBeDefined()
        expect(jsonResponse.id).toBeDefined()
    })

    test('Validate update of user information by api call (PATCH) ', async ({ request }) => {
        const data = {
            "name": "James",
            "job": "Automation developer"
        }
        const updatedUserResponse = await request.patch(`${baseURL}/api/users/2`, { data })
        expect(updatedUserResponse.status()).toEqual(200)
        expect(updatedUserResponse.statusText()).toBe('OK')
        const jsonResponse: IReponse = await updatedUserResponse.json()
        expect(jsonResponse.name).toEqual(data.name)
        expect(jsonResponse.job).toEqual(data.job)
        expect(jsonResponse.updatedAt).toBeDefined()
    })

    test('Validate user was deleted by API call (DELETED) ',async({request})=>{
        const deletedUserResponse = await request.delete(`${baseURL}/api/users/2`)
        expect(deletedUserResponse.status()).toEqual(204)
        expect(deletedUserResponse.statusText()).toBe('No Content')
    })

})
