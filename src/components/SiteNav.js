import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Button,
} from "reactstrap";
import { DIRECTOR_LIST, ADD_MOVIE, MOVIE_LIST, ADD_DIRECTOR } from "../queries/queries";
import { useQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

function SiteNav() {
  const { loading, error, data } = useQuery(DIRECTOR_LIST);
  const {
    register,
    handleSubmit,
  } = useForm();
  const {
    register: registerDirector,
    handleSubmit: handleSubmitDirector,
  } = useForm();
  const [addMovie] = useMutation(ADD_MOVIE, {refetchQueries: [{query: MOVIE_LIST}], awaitRefetchQueries: true})
  const [addDirector] = useMutation(ADD_DIRECTOR, {refetchQueries: [{query: DIRECTOR_LIST}], awaitRefetchQueries: true})

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const onSubmit = ({movieName,movieGenre,directorId}, event) => {
      addMovie({variables: {name: movieName,genre: movieGenre,directorId}})
      event.target.reset()
    }
    const onSubmitDirector = ({directorName,directorAge}, event) => {
        const IntAge = parseInt(directorAge)
        addDirector({variables: {name: directorName,age: IntAge}})
        event.target.reset()
    }
  
  return (
    <div>
      <Card>
        <CardHeader>映画監督</CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmitDirector(onSubmitDirector)}>
            <FormGroup>
              <input {...registerDirector('directorName')}
                className="form-control"
                type="text"
                placeholder="監督名"
              />
            </FormGroup>
            <FormGroup>
              <input {...registerDirector('directorAge')}
                className="form-control"
                type="number"
                placeholder="年齢"
              />
            </FormGroup>
            <Button color="primary" type="submit">
              追加
            </Button>
          </Form>
        </CardBody>
      </Card>
      <Card className="mt-4">
        <CardHeader>映画作品</CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <input {...register('movieName')} 
                className="form-control"
                type="text"
                placeholder="タイトル"
              />
            </FormGroup>
            <FormGroup>
              <input {...register('movieGenre')} 
                className="form-control"
                type="text"
                placeholder="ジャンル"
              />
            </FormGroup>
            <FormGroup>
              <select {...register('directorId')} className="form-control" type="select" >
                {data &&
                  data.directors.map(({ id, name }) => (
                    <option key={id} value={id}>{name}</option>
                  ))}
              </select>
            </FormGroup>
            <Button color="primary" type="submit">
              追加
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

export default SiteNav;
