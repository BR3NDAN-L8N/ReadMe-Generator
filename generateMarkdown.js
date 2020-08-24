// function to generate markdown for README
function generateMarkdown(data) {
  return `
  <!-- PROJECT TITLE -->
  <br />

  <h1 align="center">${data.projectName}</h1>

  <span align="center">${data.badge}</span>
  
  
  
  <!-- TABLE OF CONTENTS -->
  # Table of Contents
  
  * [About the Project](#about-the-project)
      * [Live Link](#finished-project)
      * [Project Demo](#project-demo)
      * [Built With](#built-with)
  * [Usage](#usage)
  * [License](#license)
  * [Contribution Instructions](#contributions)
  * [Test Instructions](#testing)
  * [Contact / Questions](#contact-or-questions)
  * [Acknowledgements](#acknowledgements)
  
  
  
  <!-- ABOUT THE PROJECT -->
  # About The Project
  
  ## Finished Project
  
  <!-- Add deployed link when available -->
  [Deployed Project](http://www.example.com) 
  
  ## Project Demo
  
  ${data.demoMedia}

  ## Built With

  ${data.technologies}

  # Usage

  ${data.usage}

  # License
  
  Begin license text.
        
        Copyright ${data.license.year} ${data.license.owner}
  ${data.license.licenseText}

  End license text.

  # Contributions

  ${data.contribution}

  # Testing
  
  ${data.testing}

  <!-- CONTACT -->
  # Contact or Questions
  
  * [Email](${data.email})
  * [GitHub](${data.github})
  * [LinkedIn](${data.linkedIn})
  
  
  
  <!-- ACKNOWLEDGEMENTS -->
  # Acknowledgements
  ${data.thanks}
  
  
<!-- MARKDOWN LINKS & IMAGES -->
${data.licenseLink}
${data.badgeUrl}
`;
}

module.exports = generateMarkdown;
