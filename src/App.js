import { Col, Container, Row } from "reactstrap"
import Header from "./components/Header"
import MovieList from "./components/MovieList";
import SiteNav from "./components/SiteNav"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <div className="App">
      <Header />
      <ApolloProvider client={client}>
        <Container>
          <Row>
          <Col xs={12} sm={4}>
              <SiteNav />
            </Col>
            <Col xs={12} sm={8}>
              <MovieList />
            </Col>
          </Row>
        </Container>
      </ApolloProvider>
    </div>
  );
}

export default App;
