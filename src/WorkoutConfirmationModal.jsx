import React from "react";

const WorkoutConfirmationModal = ({ workout, onConfirm, onCancel }) => {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Confirm Workout</h2>
        <p>Workout Name: {workout.name}</p>
        <p>Date: {new Date(workout.created_at).toLocaleDateString()}</p>
        <p>Time: {new Date(workout.created_at).toLocaleTimeString()}</p>
        <div>
          <h3>Exercise Summary:</h3>
          <ul>
            {workout.exercises.map((exercise, index) => (
              <li key={index}>
                {exercise.name} ({exercise.sets.length} sets)
              </li>
            ))}
          </ul>
        </div>
        <p>Please confirm that you want to track this workout.</p>
        <button onClick={handleConfirm}>Confirm</button>
        <button onClick={onCancel}>Back to Workout</button>
      </div>
    </div>
  );
};

export default WorkoutConfirmationModal;
