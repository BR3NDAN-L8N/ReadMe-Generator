// function to generate markdown for README
function generateMarkdown(data) {
  return `
  <!-- PROJECT Title -->
  <br />
  <p align="center">
    <h1 align="center">${data.title}</h1>
  </p>
  
  
  
  <!-- TABLE OF CONTENTS -->
  # Table of Contents
  
  * [About the Project](#about-the-project)
      * [Finished Project Link](#finished-project)
      * [Project Screenshot](#project-screenshot)
      * [Assignment](#assignment)
  * [Contact](#contact)
  * [Acknowledgements](#acknowledgements)
  
  
  
  <!-- ABOUT THE PROJECT -->
  # About The Project
  
  ## Finished Project
  
  [Deployed Project](${data.liveLink})
  
  ## Project ${data.projectVisualType}
  
  ${data.projectVisualLinkPath}
  
  ## Assignment
  
  ### ${data.assignmentName}
  
  ${data.assignmentDescription}
  
  
  
  <!-- CONTACT -->
  # Contact
  
  * [Email](BR3NDAN.L8N@gmail.com)
  * [LinkedIn](https://www.linkedin.com/in/brendan-leighton-ab5944113/)
  
  
  
  <!-- ACKNOWLEDGEMENTS -->
  # Acknowledgements
  ${data.acknowledgements}
  
  
`;
}

module.exports = generateMarkdown;
