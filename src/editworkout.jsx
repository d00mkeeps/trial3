import React, { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "./UserContext";

const EditWorkout = () => {
  const [workoutName, setWorkoutName] = useState("");
  const [exercises, setExercises] = useState([]);
  const { isImperial } = useContext(UserContext);

  const handleWorkoutNameChange = (e) => {
    setWorkoutName(e.target.value);
  };

  const handleAddExercise = () => {
    const newExercise = {
      id: uuidv4(),
      name: "",
      sets: [{ reps: 1, weight: 0, time: 0, rpe: "" }],
    };
    setExercises([...exercises, newExercise]);
  };

  const handleExerciseChange = (exerciseId, field, value) => {
    const updatedExercises = exercises.map((exercise) => {
      if (exercise.id === exerciseId) {
        return { ...exercise, [field]: value };
      }
      return exercise;
    });
    setExercises(updatedExercises);
  };

  const handleAddSet = (exerciseId) => {
    const updatedExercises = exercises.map((exercise) => {
      if (exercise.id === exerciseId) {
        const newSet = { reps: 1, weight: 0, time: 0, rpe: "" };
        return { ...exercise, sets: [...exercise.sets, newSet] };
      }
      return exercise;
    });
    setExercises(updatedExercises);
  };

  const handleSetChange = (exerciseId, setIndex, field, value) => {
    const updatedExercises = exercises.map((exercise) => {
      if (exercise.id === exerciseId) {
        const updatedSets = exercise.sets.map((set, index) => {
          if (index === setIndex) {
            return { ...set, [field]: value };
          }
          return set;
        });
        return { ...exercise, sets: updatedSets };
      }
      return exercise;
    });
    setExercises(updatedExercises);
  };

  const handleSubmit = () => {
    const workoutData = {
      id: uuidv4(),
      name: workoutName,
      exercises: exercises,
      userId: "user123", // Replace with the actual user ID
      timestamp: new Date().toISOString(),
    };
    // Send the workoutData to the server or perform any other necessary actions
    console.log(workoutData);
    // Reset the form
    setWorkoutName("");
    setExercises([]);
  };

  const handleDeleteExercise = (exerciseId) => {
    const updatedExercises = exercises.filter(
      (exercise) => exercise.id !== exerciseId
    );
    setExercises(updatedExercises);
  };

  const handleDeleteSet = (exerciseId, setIndex) => {
    const updatedExercises = exercises.map((exercise) => {
      if (exercise.id === exerciseId) {
        const updatedSets = exercise.sets.filter(
          (_, index) => index !== setIndex
        );
        return { ...exercise, sets: updatedSets };
      }
      return exercise;
    });
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
      <button onClick={handleAddExercise}>Add Exercise</button>
      {exercises.map((exercise) => (
        <div key={exercise.id}>
          <label>
            Exercise Name:
            <input
              type="text"
              value={exercise.name}
              onChange={(e) =>
                handleExerciseChange(exercise.id, "name", e.target.value)
              }
            />
          </label>
          <button onClick={() => handleDeleteExercise(exercise.id)}>
            Delete Exercise
          </button>
          {exercise.sets.map((set, index) => (
            <div key={index}>
              <label>
                Reps:
                <input
                  type="number"
                  value={set.reps}
                  onChange={(e) =>
                    handleSetChange(
                      exercise.id,
                      index,
                      "reps",
                      parseInt(e.target.value)
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
                      exercise.id,
                      index,
                      "weight",
                      parseFloat(e.target.value)
                    )
                  }
                />
              </label>
              <label>
                Time:
                <input
                  type="number"
                  value={set.time}
                  onChange={(e) =>
                    handleSetChange(
                      exercise.id,
                      index,
                      "time",
                      parseFloat(e.target.value)
                    )
                  }
                />
              </label>
              <label>
                RPE:
                <input
                  type="text"
                  value={set.rpe}
                  onChange={(e) =>
                    handleSetChange(exercise.id, index, "rpe", e.target.value)
                  }
                />
              </label>
              <button onClick={() => handleDeleteSet(exercise.id, index)}>
                Delete Set
              </button>
            </div>
          ))}
          <button onClick={() => handleAddSet(exercise.id)}>Add Set</button>
        </div>
      ))}
      <button onClick={handleSubmit}>Save Workout</button>
    </div>
  );
};

export default EditWorkout;
