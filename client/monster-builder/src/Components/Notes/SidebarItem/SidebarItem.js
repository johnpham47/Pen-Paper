import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './Styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../../../Components/Helpers';

class SidebarItem extends Component {
    constructor() {
        super();
    }
    
    render() {
        const {_index, _note, classes, selectedNoteIndex} = this.props;

        return(
            <div key={_index}>
                <ListItem
                className={classes.listItem}
                selected={selectedNoteIndex === _index} 
                alignItems='flex-start'>
                    <div
                    onClick={() => this.selectNote(_note, _index)}
                    className={classes.textSection}>
                        <ListItemText 
                        primary={_note.title}
                        secondary={removeHTMLTags(_note.body.substring(0, 30)) + '...'} 
                        />
                    </div>
                    <DeleteIcon onClick={() => this.deleteNote(_note)} 
                        className={classes.deleteIcon} />
                </ListItem>
            </div>
        )
    }

    selectNote = (n, i) => this.props.selectNote(n, i);

    deleteNote = (note) => {
        if (window.confirm(`Are you sure you want to delete ${note.title}`)) {
            this.props.deleteNote(note)
        }
    }
}

export default withStyles(styles) (SidebarItem)