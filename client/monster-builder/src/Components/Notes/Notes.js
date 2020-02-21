import React, { Component } from 'react'
import { useState, useEffect } from 'react'
import Editor from './Editor/Editor'
import Sidebar from './Sidebar/Sidebar'
import '../..//public/css/Notes.css'
import axios from 'axios'

class Notes extends Component {
    constructor() {
        super();
        this.state = {
            selectedNoteIndex: null,
            selectedNote: null,
            notes: null
        };
    }

    render() {
        return (
            <div className="app-container">
                <Sidebar 
                selectedNoteIndex={this.state.selectedNoteIndex}
                notes={this.state.notes}
                selectNote={(n, i) => this.selectNote(n, i)}
                deleteNote={this.deleteNote}
                newNote={this.newNote} />
                {
                    this.state.selectedNote ? 
                    <Editor selectedNote={this.state.selectedNote}
                    selectedNoteIndex={this.state.selectedNoteIndex}
                    notes={this.state.notes}
                    noteUpdate={this.noteUpdate}
                    /> : 
                    null
                }
            </div>
        )
    }

    componentDidMount = () => {
        axios.get('http://localhost:8080/get-notes')
            .then(response => {
                this.setState({
                    notes: response.data
                })
            })
    }
    selectNote = (note, index) => this.setState({ selectedNoteIndex: index, selectedNote: note})
    
    noteUpdate = (id, noteObj) => {
        console.log(id, noteObj)
        axios.post('http://localhost:8080/updateNote', {
            noteId: id,
            title: noteObj.title,
            body: noteObj.body
        })
        .then((response) => {
            axios.get('http://localhost:8080/get-notes')
                .then(response => {
                    console.log(response.data)
                    this.setState({
                        notes: response.data
                    })
                })
            }
        )
    }

    newNote = async (title) => {
        const note = {
            title: title,
            body: ''
        };
        const newFromDB = await axios.post('http://localhost:8080/addNote', {
            title: note.title,
            body: note.body
        })
        const newNote = newFromDB.data.newNote
        this.setState({ ...this.state, notes: {...this.state.notes, notes: [...this.state.notes.notes, newNote] } });
        const newNoteIndex = this.state.notes.notes.indexOf(newNote)
        this.setState({ selectedNote: this.state.notes.notes[newNoteIndex], selectedNoteIndex: newNoteIndex})
    }

    deleteNote = (note) => {
        const noteIndex = this.state.notes.notes.indexOf(note);
        if(this.state.selectedNoteIndex == noteIndex) {
            this.setState({ selectedNoteIndex: null, selectedNote: null })
        }
        else {
            this.state.notes.notes.length > 1 ?
            this.selectNote(this.state.notes.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1) :
            this.setState({ selectedNoteIndex: null, selectedNote: null });
        }
        this.setState({ ...this.state, notes: { ...this.state.notes, notes: this.state.notes.notes.filter(_note => _note !== note) } })

        axios.post('http://localhost:8080/deleteNote', {
            noteId: note.id
        })

    }

}

export default Notes