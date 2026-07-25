import AboutUs from "../../ui/about/AboutUs"

const AboutUsContainer = () => {
    const mapUrl = "https://www.google.com/maps/place/%D0%9A%D0%B5%D1%80%D0%B0%D0%BC%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B0%D1%8F+%D0%BF%D0%BB%D0%B8%D1%82%D0%BA%D0%B0/@52.1453524,25.5418121,17z/data=!4m15!1m8!3m7!1s0x47271bcc01365e75:0xe09feebaa1123420!2z0JrQtdGA0LDQvNC40YfQtdGB0LrQsNGPINC_0LvQuNGC0LrQsA!8m2!3d52.1453524!4d25.5418121!10e1!16s%2Fg%2F11z8r3cjqb!3m5!1s0x47271bcc01365e75:0xe09feebaa1123420!8m2!3d52.1453524!4d25.5418121!16s%2Fg%2F11z8r3cjqb?entry=ttu&g_ep=EgoyMDI2MDcyMi4wIKXMDSoASAFQAw%3D%3D"

    return (
        <AboutUs mapUrl={mapUrl} />
    )
}

export default AboutUsContainer