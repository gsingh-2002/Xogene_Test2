# Initialize a new Git repository
git init

# Set your Git username and email
git config user.name "gsingh-2002"
git config user.email "gsingh.apr2002@gmail.com"

# Add all files to the staging area (or specify files as needed)
git add .

# Commit the changes
git commit -m "first commit"

# Rename the default branch to 'main'
git branch -M main

# Add the remote repository
git remote add origin https://github.com/gsingh-2002/Xogene_test2.git

# Push the changes to the remote repository
git push -u origin main
