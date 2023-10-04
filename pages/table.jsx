import { useEffect, useState, useReducer } from "react";
import { Table, Loader, Dimmer, Button } from "semantic-ui-react";
import _ from "lodash";
import DataLoader from "../components/DataLoader";

export default function Index() {
  const [users, setUsers] = useState([]),
    [error, setError] = useState(null),
    URL = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((json) => setUsers(json))
      .catch((error) => setError(error));
  }, []);

  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  // TODO
  const handleUpdateUser = (id) => {
    const userToUpdate = users.find((user) => user.id === id);
    if (userToUpdate) {
      const updatedUser = { ...userToUpdate, name: "Новое имя" };
      const updatedUsers = users.map((user) =>
        user.id === id ? updatedUser : user
      );
      setUsers(updatedUsers);
    }
  };

  const Reducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_SORT":
        if (state.column === action.column) {
          return {
            ...state,
            data: state.data.slice().reverse(),
            direction:
              state.direction === "ascending" ? "descending" : "ascending",
          };
        }

        return {
          column: action.column,
          data: _.sortBy(state.data, [action.column]),
          direction: "ascending",
        };
      case "SET_DATA":
        return {
          ...state,
          data: action.data,
        };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(Reducer, {
    column: null,
    data: [],
    direction: null,
  });
  const { column, data, direction } = state;

  useEffect(() => {
    dispatch({ type: "SET_DATA", data: users });
  }, [users]);

  if (error) return <DataLoader />;

  return (
    <Table sortable celled fixed>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            textAlign="center"
            rowSpan="2"
            sorted={column === "name" ? direction : null}
            onClick={() => dispatch({ type: "CHANGE_SORT", column: "name" })}
          >
            Name
          </Table.HeaderCell>
          <Table.HeaderCell
            textAlign="center"
            rowSpan="2"
            sorted={column === "username" ? direction : null}
            onClick={() =>
              dispatch({ type: "CHANGE_SORT", column: "username" })
            }
          >
            UserName
          </Table.HeaderCell>
          <Table.HeaderCell
            textAlign="center"
            rowSpan="2"
            sorted={column === "email" ? direction : null}
            onClick={() => dispatch({ type: "CHANGE_SORT", column: "email" })}
          >
            Email
          </Table.HeaderCell>
          <Table.HeaderCell colSpan="3" textAlign="center">
            Address
          </Table.HeaderCell>

          <Table.HeaderCell rowSpan="2" textAlign="center">
            Phone
          </Table.HeaderCell>
          <Table.HeaderCell
            textAlign="center"
            rowSpan="2"
            sorted={column === "website" ? direction : null}
            onClick={() => dispatch({ type: "CHANGE_SORT", column: "website" })}
          >
            Website
          </Table.HeaderCell>
          <Table.HeaderCell colSpan="3" textAlign="center">
            Company
          </Table.HeaderCell>

          <Table.HeaderCell rowSpan="2" textAlign="center">
            Actions
          </Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell textAlign="center">Street</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Suite</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">City</Table.HeaderCell>

          <Table.HeaderCell textAlign="center">Name</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">CatchPhrase</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">BS</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map((user) => (
          <Table.Row key={user.id}>
            <Table.Cell selectable textAlign="center">
              {user.name}
            </Table.Cell>
            <Table.Cell selectable textAlign="center">
              {user.username}
            </Table.Cell>
            <Table.Cell selectable textAlign="center">
              {user.email}
            </Table.Cell>
            <Table.Cell selectable textAlign="center">
              {user.address.street}
            </Table.Cell>
            <Table.Cell selectable textAlign="center">
              {user.address.suite}
            </Table.Cell>
            <Table.Cell selectable textAlign="center">
              {user.address.city}
            </Table.Cell>
            <Table.Cell selectable textAlign="center">
              {user.phone}
            </Table.Cell>
            <Table.Cell selectable textAlign="center">
              {user.website}
            </Table.Cell>
            <Table.Cell selectable textAlign="center">
              {user.company.name}
            </Table.Cell>
            <Table.Cell selectable textAlign="center">
              {user.company.catchPhrase}
            </Table.Cell>
            <Table.Cell selectable textAlign="center">
              {user.company.bs}
            </Table.Cell>
            <Table.Cell>
              <Button.Group vertical>
                <Button onClick={() => handleDeleteUser(user.id)} color="red">
                  Delete
                </Button>
                <Button
                  onClick={() => handleUpdateUser(user.id)}
                  color="orange"
                >
                  Update
                </Button>
              </Button.Group>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
