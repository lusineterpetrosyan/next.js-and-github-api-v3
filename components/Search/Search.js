import { useSelector, useDispatch } from 'react-redux'
import { Input,
  Button,
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
import { search, deleteUser } from '../../actions'
import Config from '../../config';
import EditForm from './EditForm';

const Search = () => {
  const dispatch = useDispatch();

  const results = useSelector(state => state.search.results)
  const currentPage = useSelector(state => state.search.current_page)
  const totalCount = useSelector(state => state.search.total_count)
  const error = useSelector(state => state.search.error)
  const loading = useSelector(state => state.search.loading)
  const searchLoader = useSelector(state => state.search.search)

  const [value, updateValue] = React.useState('');
  const [edit, editState] = React.useState({});

  const handleResultSelect = () => {
    dispatch(search(value))
  }

  const onChange = (e, { value }) => {
    updateValue(value)
  }

  const handleEdit = item => e => {
    editState(item || {})
  }

  const handleDelete = id => e => {
    dispatch(deleteUser(id))
  }

  const onPageChange = (e, { activePage }) => {
    dispatch(search(value, activePage))
  }

  const getTable = results => (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>User</Table.HeaderCell>
          <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {results.map(item => (
          <Table.Row key={`user-${item.id}`}>
            <Table.Cell>
              <Header as='h4' image>
                <Image src={item.avatar_url} rounded size='mini' />
                <Header.Content>
                  <a href={item.html_url} target="_blank">{item.login}</a>
                  <Header.Subheader>{item.type}</Header.Subheader>
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>
              <Button
                style={{
                  marginLeft: 15
                }}
                primary
                icon="edit"
                onClick={handleEdit(item)}
              />
              <Button
                style={{
                  marginLeft: 15
                }}
                primary
                icon="remove"
                onClick={handleDelete(item.id)}
              />
            </Table.Cell>
          </Table.Row>
        ))
        }
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan='3'>
            <Pagination
              activePage={currentPage}
              totalPages={totalCount/Config.perPage}
              onPageChange={onPageChange}
            />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>)
  
  
  return (
    <Grid padded>
      <Grid.Column width={12}>
        <Input loading={searchLoader} placeholder="Search..." value={value} onChange={onChange}  />
        <Button
          style={{
            marginLeft: 15
          }}
          primary
          content='Search'
          disabled={searchLoader || !value.length}
          onClick={handleResultSelect}
        />
      </Grid.Column>
      <Grid.Column width={12}>
        <Header>Result</Header>
        {error || null}
        <Dimmer active={loading} inverted>
          <Loader active={loading} inverted content='Loading' />
        </Dimmer>
        {(!error && results.length &&  getTable(results)) || 'There is no data'}
        {(Object.keys(edit).length && <EditForm item={edit} closeForm={handleEdit} />) || null}
      </Grid.Column>
    </Grid>
  )
}

export default Search
