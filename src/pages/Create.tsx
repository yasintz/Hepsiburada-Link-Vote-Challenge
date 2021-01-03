import * as React from 'react';
import {
  Col, Row, Form, Button, Spinner,
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { ShowToastFunction } from '../App';
import { createLink } from '../services/api';

type CreatePageProps = {
  showToast: ShowToastFunction;
};

type InputError = {
  name?: string;
  url?: string;
};

const CreatePage: React.FC<CreatePageProps> = ({ showToast }) => {
  const [error, setError] = React.useState<InputError>({
    name: undefined,
    url: undefined,
  });
  const formRef = React.useRef<HTMLFormElement>();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {
      name: { value: name },
      url: { value: url },
    } = event.target as any;

    const errorState: InputError = {
      url: !url ? 'URL cannot be empty.' : undefined,
      name: !name ? 'Name cannot be empty.' : undefined,
    };

    setError(errorState);

    const hasError = !!(errorState.url || errorState.name);

    if (!hasError) {
      setIsLoading(true);
      try {
        await createLink({ name, url });
        formRef.current?.reset();

        showToast('success', `${name} added`);
      } catch (err) {
        showToast('error', err.message);
      }

      setIsLoading(false);
    }
  };
  return (
    <>
      <Row>
        <NavLink to="/">← Return to List</NavLink>
      </Row>
      <Row>
        <Col>
          <Row className="my-3">
            <h3 className="m-0">Add New Link</h3>
          </Row>
          <Row>
            <Form
              onSubmit={handleSubmit}
              ref={formRef as any}
              className="w-100"
            >
              <Form.Group controlId="name">
                <Form.Label>Link name</Form.Label>
                <Form.Control
                  placeholder="e.g. Alphabet"
                  isInvalid={!!error.name}
                  name="name"
                />
                <Form.Control.Feedback type="invalid">
                  {error.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="url">
                <Form.Label>Link Url</Form.Label>
                <Form.Control
                  placeholder="e.g. https://abc.xyz"
                  isInvalid={!!error.url}
                  name="url"
                />
                <Form.Control.Feedback type="invalid">
                  {error.url}
                </Form.Control.Feedback>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="d-flex justify-content-center align-items-center float-right"
              >
                Add
                {isLoading && (
                  <Spinner
                    animation="border"
                    role="status"
                    size="sm"
                    className="ml-2"
                  >
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                )}
              </Button>
            </Form>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default CreatePage;
