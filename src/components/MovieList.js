import React from 'react';
import { Card, CardBody, Table, Button } from 'reactstrap';
import { MOVIE_LIST, DELETE_MOVIE } from "../queries/queries"
import { useQuery, useMutation } from "@apollo/client";

  function MovieList(){
    const { loading, error, data } = useQuery(MOVIE_LIST)
    const [deleteMutation] = useMutation(DELETE_MOVIE, {refetchQueries: [{query: MOVIE_LIST}], awaitRefetchQueries: true})
    const handleDeleteMovie = (id) => {
        deleteMutation({ variables: {id}})
    }
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    return (
        <Card>
            <CardBody>
                <Table hover>
                    <thead>
                        <tr>
                        <th>タイトル</th>
                        <th>ジャンル</th>
                        <th colSpan="2">監督</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.movies.map(({id, name, genre, director}) => (
                                <tr key={id}>
                                <td>{name}</td>
                                <td>{genre}</td>
                                <td>{director.name}</td>
                                <td><Button color="primary" onClick={() => handleDeleteMovie(id)}>削除</Button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    )
}

export default MovieList;