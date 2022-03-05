const dropZone = document.querySelector(".drop-zone");
const fileInput = document.querySelector("#fileInput");
const browseBtn = document.querySelector(".browseBtn");

const progressContainer = document.querySelector(".progress-container");

const bgProgress = document.querySelector(".bg-progress");
const progressBar = document.querySelector("progress-bar");
const percentDiv = document.querySelector("#percent");
const fileURLInput = document.querySelector("#fileURL");
const copyBtn = document.querySelector("#copyBtn");


const sharingConatiner = document.querySelector(".sharing-container")

const host = "https://dropfiles.herokuapp.com/";
const uploadURL = `${host}api/files`;

dropZone.addEventListener("dragover",(e)=>{
    e.preventDefault();
    // console.log("drraging");
    if (!dropZone.classList.contains("dragged")){
        dropZone.classList.add("dragged");
    }
} );

dropZone.addEventListener("dragleave",()=>{
    dropZone.classList.remove("dragged");
});

dropZone.addEventListener("drop",(e)=>{
    e.preventDefault();
    dropZone.classList.remove("dragged");
    const files = e.dataTransfer.files;
    console.table(files);
    if (files.length){
        fileInput.files = files;
        uploadFile();
    }
    
});

fileInput.addEventListener("change", ()=>{
    uploadFile();
});

browseBtn.addEventListener("click",()=>{
    fileInput.click();
});

copyBtn.addEventListener("click", ()=>{
    fileURLInput.select();
    document.execCommand("copy");
});

const uploadFile = ()=>{
    progressContainer.style.display ="block";
    const file = fileInput.files[0];
    const formData =new FormData();
    formData.append("myfile",file);

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange =() => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log(xhr.response);
            showLink(JSON.parse(xhr.response));
        }

    };

xhr.upload.onprogress = updateProgress;

    xhr.open("POST", uploadURL);
    xhr.send(formData);
};

const updateProgress = (e)=>{
    let percent = Math.round((100 * event.loaded) / event.total);
    // console.log(percent);
    percentDiv.innerText = percent;
    const scaleX2 = `scaleX(${percent / 100})`;
    bgProgress.style.transform = scaleX2;
    // progressBar.style.transform = `scaleX(${percent / 100})`;
};

const showLink = ({file: url})=>{
    console.log(url);
    progressContainer.style.display ="none";
    sharingConatiner.style.display ="block";
    fileURLInput.value = url;
}