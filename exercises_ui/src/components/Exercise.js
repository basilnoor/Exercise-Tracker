import React from 'react';
import { GoX } from 'react-icons/go';
import { MdOutlineEdit } from 'react-icons/md';

function Exercise({ exercise, onDelete, onEdit }) {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td>< MdOutlineEdit onClick={() => onEdit(exercise)} /></td>
            <td>< GoX onClick={() => onDelete(exercise._id)} /></td>
        </tr>
    );
}

export default Exercise;