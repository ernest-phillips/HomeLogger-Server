const exercises = [{
        exercise: "Flat Barbell",
        bodypart: "chest"
    },
    {
        exercise: "Dumbbell Bench Press",
        bodypart: "chest"
    },
    {
        exercise: "Incline Barbell ",
        bodypart: "chest"
    },
    {
        exercise: "Dumbbell Bench Press",
        bodypart: "chest"
    },
    {
        exercise: "Decline Barbell ",
        bodypart: "chest"
    },
    {
        exercise: "Dumbbell Bench Press",
        bodypart: "chest"
    },
    {
        exercise: "Flat Chest Press Machine",
        bodypart: "chest"
    },
    {
        exercise: "Incline Chest Press Machine",
        bodypart: "chest"
    },
    {
        exercise: "Decline Chest Press Machine",
        bodypart: "chest"
    },
    {
        exercise: "Dips",
        bodypart: "chest"
    },
    {
        exercise: "Dips (Machine)",
        bodypart: ["chest", "triceps"]
    },
    {
        exercise: "Push-Ups",
        bodypart: "chest"
    },
    {
        exercise: "Flat Dumbbell Flyes",
        bodypart: "chest"
    },
    {
        exercise: "Incline Dumbbell Flyes",
        bodypart: "chest"
    },
    {
        exercise: "Decline Dumbbell Flyes",
        bodypart: "chest"
    },
    {
        exercise: "Pec Deck Machine",
        bodypart: "chest"
    },
    {
        exercise: "Cable Crossovers",
        bodypart: "chest"
    },
    {
        exercise: "Cable Flyes",
        bodypart: "chest"
    },
    {
        exercise: "Pull-Ups",
        bodypart: "back"
    },
    {
        exercise: "Chin-Ups",
        bodypart: "back"
    },
    {
        exercise: "Lat Pull-Downs",
        bodypart: "back"
    },
    {
        exercise: "Bent Over Barbell ",
        bodypart: "back"
    },
    {
        exercise: "Dumbbell Rows",
        bodypart: "back"
    },
    {
        exercise: "T-Bar Rows",
        bodypart: "back"
    },
    {
        exercise: "Seated Cable Rows",
        bodypart: "back"
    },
    {
        exercise: "Barbell Rows",
        bodypart: "back"
    },
    {
        exercise: "Dumbbell Rows",
        bodypart: "back"
    },
    {
        exercise: "Machine Rows",
        bodypart: "back"
    },
    {
        exercise: "Inverted Rows",
        bodypart: "back"
    },
    {
        exercise: "Barbell Shrugs",
        bodypart: "back"
    },
    {
        exercise: "Dumbbell Shrugs",
        bodypart: "back"
    },
    {
        exercise: "Machine Shrugs",
        bodypart: "back"
    },
    {
        exercise: "Seated Overhead Barbell Press",
        bodypart: "shoulders"
    },
    {
        exercise: "Seated Overhead Dumbbell Press",
        bodypart: "shoulders"
    },
    {
        exercise: "Standing Overhead Barbell ",
        bodypart: "shoulders"
    },
    {
        exercise: "Standing Overhead Dumbbell Press",
        bodypart: "shoulders"
    },
    {
        exercise: "Overhead Machine Press",
        bodypart: "shoulders"
    },
    {
        exercise: "Arnold Press",
        bodypart: "shoulders"
    },
    {
        exercise: "Barbell Upright Rows",
        bodypart: "shoulders"
    },
    {
        exercise: "Dumbbell Upright Rows",
        bodypart: "shoulders"
    },
    {
        exercise: "Machine Upright Rows",
        bodypart: "shoulders"
    },
    {
        exercise: "Dumbbell Lateral Raises ",
        bodypart: "shoulders"
    },
    {
        exercise: "Cable Lateral Raises",
        bodypart: "shoulders"
    },
    {
        exercise: "Machine Lateral Raises",
        bodypart: "shoulders"
    },
    {
        exercise: "Dumbbell Front Raises",
        bodypart: "shoulders"
    },
    {
        exercise: "Cable Front Raises",
        bodypart: "shoulders"
    },
    {
        exercise: "Machine Front Raises",
        bodypart: "shoulders"
    },
    {
        exercise: "Barbell Rear Delt Flyes",
        bodypart: "shoulders"
    },
    {
        exercise: "Dumbbell Rear Delt Flyes",
        bodypart: "shoulders"
    },
    {
        exercise: "Reverse Pec Deck",
        bodypart: "shoulders"
    },
    {
        exercise: "Barbell Squats",
        bodypart: "shoulders"
    },
    {
        exercise: "Dumbbell Squats",
        bodypart: "shoulders"
    },
    {
        exercise: "Front Squats",
        bodypart: "shoulders"
    },
    {
        exercise: "Barbell Split Squats",
        bodypart: "legs"
    },
    {
        exercise: "Dumbbell Split Squats",
        bodypart: "legs"
    },
    {
        exercise: "Barbell Lunges",
        bodypart: "legs"
    },
    {
        exercise: "Dumbbell Lunges",
        bodypart: "legs"
    },
    {
        exercise: "Barbell Step Ups",
        bodypart: "legs"
    },
    {
        exercise: "Dumbbell Step-Ups",
        bodypart: "legs"
    },
    {
        exercise: "Leg Press",
        bodypart: "legs"
    },
    {
        exercise: "Single Leg Press",
        bodypart: "legs"
    },
    {
        exercise: "Machine Squat",
        bodypart: "legs"
    },
    {
        exercise: "Hack Squat",
        bodypart: "legs"
    },
    {
        exercise: "Leg Extensions",
        bodypart: "legs"
    },
    {
        exercise: "Romanian Deadlifts",
        bodypart: "legs"
    },
    {
        exercise: "Straight Leg Deadlifts",
        bodypart: "legs"
    },
    {
        exercise: "Sumo Deadlifts",
        bodypart: "legs"
    },
    {
        exercise: "Glute-Ham Raises",
        bodypart: "legs"
    },
    {
        exercise: "Hyperextensions",
        bodypart: "legs"
    },
    {
        exercise: "Cable Pull-Throughs",
        bodypart: "legs"
    },
    {
        exercise: "Good-Mornings",
        bodypart: "legs"
    },
    {
        exercise: "Leg Curls",
        bodypart: "legs"
    },
    {
        exercise: "Standing Barbell Curls",
        bodypart: "biceps"
    },
    {
        exercise: "Standing Dumbbell Curls",
        bodypart: "biceps"
    },
    {
        exercise: "Barbell Preacher Curls",
        bodypart: "biceps"
    },
    {
        exercise: "Dumbbell Preacher Curls",
        bodypart: "biceps"
    },
    {
        exercise: "Seated Dumbbell Curls",
        bodypart: "biceps"
    },
    {
        exercise: "Incline Dumbbell Curls",
        bodypart: "biceps"
    },
    {
        exercise: "Hammer Curls",
        bodypart: "biceps"
    },
    {
        exercise: "Concentration Curls",
        bodypart: "biceps"
    },
    {
        exercise: "Cable Curls",
        bodypart: "biceps"
    },
    {
        exercise: "Biceps Curl Machine",
        bodypart: "biceps"
    },
    {
        exercise: "Flat Close Grip Bench Press",
        bodypart: "triceps"
    },
    {
        exercise: "Decline Close Grip Bench Press",
        bodypart: "triceps"
    },
    {
        exercise: "Close Grip Push-Ups",
        bodypart: "triceps"
    },
    {
        exercise: "Laying Barbell Triceps Extensions",
        bodypart: "triceps"
    },
    {
        exercise: "Laying Dumbbell Triceps Extensions",
        bodypart: "triceps"
    },
    {
        exercise: "Skull Crushers",
        bodypart: "triceps"
    },
    {
        exercise: "Overhead Barbell Triceps Extensions",
        bodypart: "triceps"
    },
    {
        exercise: "Dumbbell Triceps Extensions",
        bodypart: "triceps"
    },
    {
        exercise: "Cable Press-Downs",
        bodypart: "triceps"
    },
    {
        exercise: "Bench Dips",
        bodypart: ["triceps", "chest"]
    }
];