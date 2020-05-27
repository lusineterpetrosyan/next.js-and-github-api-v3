import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Input,
  Button,
  Modal,
  Menu,
  Icon,
  Grid,
  Header,
  Segment,
  Table,
  Image,
  Pagination,
  Loader,
  Dimmer
} from 'semantic-ui-react'
import { edit } from '../../actions'
import Config from '../../config';

const EditForm = ({ item, closeForm }) => {
  const [user, editUser] = React.useState(item || {})
  useEffect(() => {
    editUser(item);
  }, [item]);

  const dispatch = useDispatch();

  const updateUser = () => {
    dispatch(edit(user));
    editUser({})
  }

  const editLogin = e => {
    const u = { ...user, login: e.target.value }
    editUser(u)
  }

  const onClose = () => {
    editUser({})
    closeForm({});
  }

  return (
    <Modal open={Boolean(Object.keys(user).length)} closeIcon onClose={onClose}>
      <Modal.Header>Edit User</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Input onChange={e => editLogin(e)} value={user.login} />
          <Button
            style={{
              marginLeft: 15
            }}
            disabled={!(user.login && user.login.length)}
            onClick={() => updateUser()}
          >Update</Button>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

export default EditForm
