//refer docs 1.1.1
const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue,fetchData})=>{
    root.innerHTML = `
        <label><b>search for a label<b></label>
        <input class="input" />
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>
        `

    //selectors
    const input = root.querySelector('input')
    const dropdown = root.querySelector('.dropdown')
    const resultsWrapper = root.querySelector('.results')

    //refer docs 1.1.2
    const onInput = async (event) => {
        const items = await fetchData(event.target.value)
        console.log(items)

        if (!items.length) {
            dropdown.classList.remove('is-active')
            return
        }

        resultsWrapper.innerHTML = '';
        dropdown.classList.add('is-active')

        for (let item of items) {
            const option = document.createElement('a')
            

            option.classList.add('dropdown-item')
            option.innerHTML = renderOption(item) 
            option.addEventListener('click', () => {
                dropdown.classList.remove('is-active')
                input.value = inputValue(item)
                onOptionSelect(item)
            });
            resultsWrapper.appendChild(option)
        }
    }
    
    //when we type on the input
    input.addEventListener('input', debounce(onInput, 500))

    //when we click outside the dropdown it should close
    document.addEventListener('click', (event) => {
        if (!root.contains(event.target)) {
            dropdown.classList.remove('is-active')
        }
    })
}