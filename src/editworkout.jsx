import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import { fetchUserProfile, uploadWorkout } from "./supabaseClient";
import WorkoutConfirmationModal from "./WorkoutConfirmationModal";

const EditWorkout = () => {
  const [workoutName, setWorkoutName] = useState("");
  const [workoutNotes, setWorkoutNotes] = useState("");
  const [exercises, setExercises] = useState([]);
  const { userProfile, isImperial } = useContext(UserContext);
  const [workoutData, setWorkoutData] = useState(null);

  const handleWorkoutNameChange = (e) => {
    setWorkoutName(e.target.value);
  };

  const handleWorkoutNotesChange = (e) => {
    setWorkoutNotes(e.target.value);
  };

  const handleAddExercise = () => {
    const newExercise = {
      exerciseId: "",
      name: "",
      sets: [{ reps: 1, weight: 0, time: 0, restTime: 0, rpe: "", notes: "" }],
    };
    setExercises([...exercises, newExercise]);
  };

  const handleExerciseChange = (exerciseIndex, field, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex][field] = value;
    setExercises(updatedExercises);
  };

  const handleAddSet = (exerciseIndex) => {
    const updatedExercises = [...exercises];
    const newSet = {
      reps: 1,
      weight: 0,
      time: 0,
      restTime: 0,
      rpe: "",
      notes: "",
    };
    updatedExercises[exerciseIndex].sets.push(newSet);
    setExercises(updatedExercises);
  };

  const handleSetChange = (exerciseIndex, setIndex, field, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].sets[setIndex][field] = value;
    setExercises(updatedExercises);
  };
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleSubmit = () => {
    const newWorkoutData = {
      user_id: userProfile?.id,
      name: workoutName,
      notes: workoutNotes,
      exercises: exercises,
      created_at: new Date().toISOString(),
    };
    setWorkoutData(newWorkoutData);
    setShowConfirmationModal(true);
  };

  const handleConfirmWorkout = async () => {
    try {
      await uploadWorkout(workoutData);
      setShowConfirmationModal(false);
      // Reset the form
      setWorkoutName("");
      setWorkoutNotes("");
      setExercises([]);
    } catch (error) {
      console.error("Error saving workout:", error.message);
    }
  };

  const handleDeleteExercise = (exerciseIndex) => {
    const updatedExercises = exercises.filter(
      (_, index) => index !== exerciseIndex
    );
    setExercises(updatedExercises);
  };

  const handleDeleteSet = (exerciseIndex, setIndex) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].sets = updatedExercises[
      exerciseIndex
    ].sets.filter((_, index) => index !== setIndex);
    setExercises(updatedExercises);
  };

  const weightUnit = isImperial ? "lbs" : "kg";

  return (
    <div>
      <h2>Workout Tracker</h2>
      <label>
        Workout Name:
        <input
          type="text"
          value={workoutName}
          onChange={handleWorkoutNameChange}
        />
      </label>
      <label>
        Workout Notes:
        <textarea value={workoutNotes} onChange={handleWorkoutNotesChange} />
      </label>
      <button onClick={handleAddExercise}>Add Exercise</button>
      {exercises.map((exercise, exerciseIndex) => (
        <div key={exerciseIndex}>
          <label>
            Exercise ID:
            <input
              type="text"
              value={exercise.exerciseId}
              onChange={(e) =>
                handleExerciseChange(
                  exerciseIndex,
                  "exerciseId",
                  e.target.value
                )
              }
            />
          </label>
          <label>
            Exercise Name:
            <input
              type="text"
              value={exercise.name}
              onChange={(e) =>
                handleExerciseChange(exerciseIndex, "name", e.target.value)
              }
            />
          </label>
          <button onClick={() => handleDeleteExercise(exerciseIndex)}>
            Delete Exercise
          </button>
          {exercise.sets.map((set, setIndex) => (
            <div key={setIndex}>
              <label>
                Reps:
                <input
                  type="number"
                  value={set.reps}
                  onChange={(e) =>
                    handleSetChange(
                      exerciseIndex,
                      setIndex,
                      "reps",
                      parseFloat(e.target.value)
                    )
                  }
                />
              </label>
              <label>
                Weight ({weightUnit}):
                <input
                  type="number"
                  value={set.weight}
                  onChange={(e) =>
                    handleSetChange(
                      exerciseIndex,
                      setIndex,
                      "weight",
                      parseFloat(e.target.value)
                    )
                  }
                />
              </label>
              <label>
                Duration:
                <input
                  type="number"
                  value={set.time}
                  onChange={(e) =>
                    handleSetChange(
                      exerciseIndex,
                      setIndex,
                      "time",
                      parseInt(e.target.value)
                    )
                  }
                />
              </label>
              <label>
                Rest Time:
                <input
                  type="number"
                  value={set.restTime}
                  onChange={(e) =>
                    handleSetChange(
                      exerciseIndex,
                      setIndex,
                      "restTime",
                      parseInt(e.target.value)
                    )
                  }
                />
              </label>
              <label>
                RPE:
                <input
                  type="number"
                  value={set.rpe}
                  onChange={(e) =>
                    handleSetChange(
                      exerciseIndex,
                      setIndex,
                      "rpe",
                      parseInt(e.target.value)
                    )
                  }
                />
              </label>
              <label>
                Notes:
                <input
                  type="text"
                  value={set.notes}
                  onChange={(e) =>
                    handleSetChange(
                      exerciseIndex,
                      setIndex,
                      "notes",
                      e.target.value
                    )
                  }
                />
              </label>
              <button onClick={() => handleDeleteSet(exerciseIndex, setIndex)}>
                Delete Set
              </button>
            </div>
          ))}
          <button onClick={() => handleAddSet(exerciseIndex)}>Add Set</button>
        </div>
      ))}
      <button onClick={handleSubmit} disabled={!userProfile}>
        Save Workout
      </button>
      {showConfirmationModal && (
        <WorkoutConfirmationModal
          workout={workoutData}
          onConfirm={handleConfirmWorkout}
          onCancel={() => setShowConfirmationModal(false)}
        />
      )}
    </div>
  );
};

export default EditWorkout;
