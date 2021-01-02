import React from 'react';
import { Row, Col, Container, Toast } from 'react-bootstrap';
import { logo } from './constants';
import ListPage from './pages/List';
import { Switch, Route } from 'react-router-dom';
import CreatePage from './pages/Create';

export type ToastType = 'success' | 'error';
export type ShowToastFunction = (type: ToastType, message: string) => void;
export type ToastData = {
  type: boolean | ToastType;
  message: string;
};

function App() {
  const [toast, setToast] = React.useState<ToastData>({
    type: false,
    message: '',
  });

  const showToast: ShowToastFunction = (type, message) => {
    setToast({ type: type, message });
    setTimeout(() => setToast({ type: false, message: '' }), 1500);
  };

  return (
    <Container fluid="md" className="mt-3 position-relative">
      <Row className="border-bottom">
        <Col>
          <Row>
            <Col
              className="d-flex justify-content-center justify-content-md-start"
              sm={12}
              md={6}
            >
              {
                // eslint-disable-next-line
                <a
                  className="h-logo"
                  href="https://www.hepsiburada.com/"
                  style={{ backgroundImage: `url("${logo}")` }}
                  title="Hepsiburada"
                />
              }
            </Col>
            <Col
              className="d-flex justify-content-md-end l-logo justify-content-center"
              sm={12}
              md={6}
            >
              <span>Link</span>
              <span>VOTE</span>&nbsp; Challenge
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="d-flex justify-content-center mt-3">
        <Col sm md={8} lg={6}>
          <Switch>
            <Route path="/create">
              <CreatePage showToast={showToast} />
            </Route>
            <Route path="/">
              <ListPage showToast={showToast} />
            </Route>
          </Switch>
        </Col>
      </Row>
      <div className="d-flex align-items-center justify-content-center toast-container">
        <Toast show={!!toast.type} className={`toast ${toast.type || ''}`}>
          <Toast.Body>{toast.message}</Toast.Body>
        </Toast>
      </div>
    </Container>
  );
}

export default App;
