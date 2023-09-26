import Card from 'react-bootstrap/Card';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import moment from 'moment';

const EventCard = (props) => {

    const handleDelete = () => {
        //localhost:8080/api/events/5
        const idToDelete = props.event.id;
        confirmAlert({
            title: 'Confirm to Delete Event',
            message: `Are you sure to delete this event: ${props.event.title}?`,
            buttons: [
              {
                label: 'Yes',
                onClick: () => props.onDelete(idToDelete)
              },
              {
                label: 'No',
                onClick: () => console.log('Click No')
              },
              {
                label: 'Maybe?',
                onClick: () => console.log('Click Maybe')
              }
            ]
          });
        }
        //props.onDelete(idToDelete)


    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{props.event.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Date: {!props.event.eventtime ? "TBD" :moment(props.event.eventtime).format('MMMM Do, YYYY')}</Card.Subtitle>
                <Card.Text>
                    Location: {props.event.location}
                </Card.Text>
                <button onClick={handleDelete}>Delete</button>
                <button>Edit</button>
            </Card.Body>
        </Card>
    )
}

export default EventCard;