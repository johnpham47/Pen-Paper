
import React, { Component, useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import debounce from '../../../Components/Helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './Styles';

class Editor extends Component {
    constructor() {
        super();
        this.state = {
            text: '',
            title: '',
            id: ''
        };
    }

    componentDidMount = () => {
        console.log(this.state)
        this.setState({
            text: this.props.selectedNote.body,
            title: this.props.selectedNote.title,
            id: this.props.selectedNote.id
        });
    }

    componentDidUpdate = () => {
        if(this.props.selectedNote.id !== this.state.id) {
            this.setState({
                text: this.props.selectedNote.body,
                title: this.props.selectedNote.title,
                id: this.props.selectedNote.id
            });
        }
    }

    render() {
        const {classes} = this.props;
        

        return(
            <div className={classes.editorContainer}>
                <ReactQuill
                value={this.state.text}
                onChange={this.updateBody}>

                </ReactQuill>
            </div>
        );
    }
    updateBody = async (val) => {
        await this.setState({ text: val});
        this.update();
    }
    update = debounce(() => {
        console.log("User is udpati")
        this.props.noteUpdate(this.state.id, {
            title: this.state.title,
            body: this.state.text
        })
    }, 1500);
    }
// const Editor = (props) => {
//     const [text, setText] = useState('')
//     const [title, setTitle] = useState('')
//     const [id, setId] = useState('')
//     const { classes } = props

//    const updateBody = async (val) => {
//         await setText({
//             text: val
//         });
//         {update()}
//     }

//    const update = debounce(() => {
//         console.log('UPDATING DATABASE')
//    }, 1500);


//     return(
//         <div className={classes.editorContainer}>
//             <ReactQuill value={text} onChange={updateBody}></ReactQuill>
//         </div>
//     )
//     }

export default withStyles(styles) (Editor)