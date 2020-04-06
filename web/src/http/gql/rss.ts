import gql from "graphql-tag"

export const QUERY_POEM = gql`
    query rss($name: String!) {
        rss(name: $name) {
            name
            link
            title
            enable
            lastDate
        }
    }
`;

// client.query({
//     query: QUERY_POEM,
//     variables: {
//         id: 1,
//     }
// }).then((data)=>{
//     console.warn('------', data);
// })
