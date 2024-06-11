// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const key = import.meta.env.VITE_SUPABASE_KEY;
const url = import.meta.env.VITE_SUPABASE_URL;
const supabase = createClient(url, key);

export const fetchUserProfile = async () => {
  try {
    const { data: userProfiles, error } = await supabase
      .from("user_profiles")
      .select();

    if (error) {
      throw error;
    }

    return userProfiles[0];
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};
export const uploadWorkout = async (workoutData) => {
  try {
    // Insert the workout into the workouts table
    const { data: insertedWorkout, error: workoutError } = await supabase
      .from("workouts")
      .insert([
        {
          user_id: workoutData.user_id,
          created_at: workoutData.created_at,
          notes: workoutData.notes,
          workout_name: workoutData.name,
        },
      ])
      .single();

    if (workoutError) {
      throw workoutError;
    }

    const workoutId = insertedWorkout.id;

    // Insert the sets into the workout_sets table
    const { data: insertedSets, error: setsError } = await supabase
      .from("workout_sets")
      .insert(
        workoutData.exercises.flatMap((exercise, exerciseIndex) =>
          exercise.sets.map((set, setIndex) => ({
            workout_id: workoutId,
            set_number: setIndex + 1,
            reps: set.reps,
            weight: set.weight,
            duration: set.time,
            rest_time: set.restTime || null,
            rpe: set.rpe || null,
            exercise_performed: exercise.exerciseId,
            notes: set.notes || null,
          }))
        )
      );

    if (setsError) {
      throw setsError;
    }

    console.log("Workout and sets saved:", {
      workout: insertedWorkout,
      sets: insertedSets,
    });
    return { workout: insertedWorkout, sets: insertedSets };
  } catch (error) {
    console.error("Error saving workout and sets:", error.message);
    throw error;
  }
};
