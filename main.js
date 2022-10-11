const hamburger = document.querySelector('.hamburger');
const navLists = document.querySelector('.nav-lists');
const projectCollection = document.querySelector('.collection');
const popupModal = document.querySelector('.popup');

hamburger.addEventListener('click', (e) => {
	e.preventDefault();
	hamburger.classList.toggle('active');
	navLists.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach((nav) =>
	nav.addEventListener('click', (e) => {
		e.preventDefault();
		hamburger.classList.remove('active');
		navLists.classList.remove('active');
	})
);

window.onload = async () => {
	document.querySelectorAll('.work2-button').forEach((button) =>
		button.addEventListener('click', async () => {
			const response = await fetch('./projects.json');
			const data = await response.json();

			const item = data[button.id];

			popupModal.append(displayProjectDetail(item));

			console.log(data[button.id]);
			popupModal.classList.add('show-popup');

			addhumburgerEvent();
		})
	);

	console.log('ready');
};

const getProjects = async () => {
	const response = await fetch('./projects.json');

	try {
		const data = await response.json();

		data.map((project, index) => {
			projectCollection.append(displayProjects(project, index));

			console.log(index);
		});

		console.log(data[0]);
	} catch (error) {
		console.log(error);
	}
};

const displayProjects = ({ name, description, technologies, id }, index) => {
	let div = document.createElement('div');
	div.innerHTML = `
  <div class="work2" id="${id}">
  <h5>${name}</h5>
  <p>${description}</p>
  <ul class="lists">
    <li>${technologies[0]}</li>
    <li>${technologies[1]}</li>
    <li>${technologies[2]}</li>
  </ul>
  <button class="work2-button" id="${index}">See
    project</button>
</div>
  `;

	return div;
};

const displayProjectDetail = ({ name, description, technologies, image }) => {
	let div = document.createElement('div');
	div.className = 'popup-body';
	div.innerHTML = `
  <div class="pop-title">
    <h2>${name}</h2>
    <div class="popup-hamburger">
      <span class="bar1"></span>
      <span class="bar1"></span>
      <span class="bar1"></span>
    </div>
  </div>
  <div class="technologies">
    <ul>
      <li>${technologies[0]}</li>
      <li>${technologies[1]}</li>
      <li>${technologies[2]}</li>
    </ul>
  </div>
  <div class="popup-content">
    <div class="popup-content-img">
          <img src="${image}" alt="">
    </div>
    <div class="popup-content-pararaph">
      <p>${description}</p>
      <div class="popup-content-buttona">
        <button>See Live <span><img src="./items/see-live-icon.png" alt=""></span></button>
        <button>See Source <span><img src="./items/see-source-icon.png" alt=""></span></button>
      </div>
    </div>
  </div>
  `;

	return div;
};

const addhumburgerEvent = () => {
	document.querySelector('.popup-hamburger').addEventListener('click', () => {
		popupModal.classList.remove('show-popup');
		popupModal.innerHTML = ``;
	});
};

getProjects();
