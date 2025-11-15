/* ======================================================
   JS PRINCIPAL – ANÁLISIS CRÍTICO (BILINGÜE ES/EN)
   Autor: Diego Fuentes
   ====================================================== */

AOS.init();

/* ==========================
   ESTADO GLOBAL
   ========================== */
let currentLang = localStorage.getItem("lang") || "es";
let chartInstance = null;
let swiperInstance = null;

/* ==========================
   TEXTOS ESTÁTICOS UI
   ========================== */
const uiText = {
    es: {
        navTitle: "Análisis crítico del marco sectorial – Diego Fuentes",
        mainTitle: "Análisis crítico e interactivo del Acuerdo Marco Sectorial del carbón",
        mainSub: "Qué dice cada punto, qué significa en sencillo y por qué es problemático.",
        btnIniciar: "Ver análisis",
        chartsTitle: "Nivel de problema en el contenido",
        carouselTitle: "Puntos más delicados del acuerdo",
        btnPDF: "Descargar análisis en PDF",
        btnComparar: "Resumen crítico general",
        footer: "Desarrollado por <strong>Diego Fuentes</strong> © 2025",
        modoLabel: "Modo claro / oscuro",
        compararTitulo: "Resumen crítico general",
        compararContenido: `
            <p><strong>Puntos con problemas más graves:</strong> indemnizaciones desproporcionadas, entrega de tierras y activos, garantías de empleo casi absolutas.</p>
            <p><strong>Problemas frecuentes:</strong> redacción poco precisa, exigencias sin límite temporal claro y ausencia de soporte jurídico explícito.</p>
            <p><strong>Riesgo general:</strong> el texto, tal como está, dificulta la negociación seria y puede percibirse como una lista de exigencias imposibles.</p>
        `,
        compararIcon: "warning",
        pdfFileName: "Analisis_Critico_Marco_Sectorial_DiegoFuentes.pdf",
        modalOriginal: "Extracto del texto (como está planteado)",
        modalExplicacion: "¿Qué está diciendo este punto en palabras sencillas?",
        modalProblemas: "Problemas y riesgos de este punto"
    },
    en: {
        navTitle: "Critical analysis of the sectoral agreement – Diego Fuentes",
        mainTitle: "Critical and interactive analysis of the Coal Sectoral Framework Agreement",
        mainSub: "What each clause says, what it really means and why it is problematic.",
        btnIniciar: "View analysis",
        chartsTitle: "Problem level in the content",
        carouselTitle: "Most sensitive items of the agreement",
        btnPDF: "Download analysis as PDF",
        btnComparar: "Overall critical summary",
        footer: "Developed by <strong>Diego Fuentes</strong> © 2025",
        modoLabel: "Light / dark mode",
        compararTitulo: "Overall critical summary",
        compararContenido: `
            <p><strong>Most serious issues:</strong> disproportionate severance amounts, transfer of lands and assets, almost absolute job guarantees.</p>
            <p><strong>Common problems:</strong> vague wording, demands with no clear time limit and lack of explicit legal justification.</p>
            <p><strong>General risk:</strong> in its current form, the text makes serious negotiation difficult and may be perceived as a list of unrealistic demands.</p>
        `,
        compararIcon: "warning",
        pdfFileName: "Critical_Analysis_Sectoral_Framework_DiegoFuentes.pdf",
        modalOriginal: "Text excerpt (as formulated)",
        modalExplicacion: "What this clause is actually asking for",
        modalProblemas: "Main problems and risks"
    }
};

/* ==========================
   PUNTOS DEL PLIEGO:
   ORIGINAL + RESUMEN + PROBLEMAS (CRÍTICOS)
   ========================== */
const puntos = [
    {
        nivel: 4,
        texts: {
            es: {
                titulo: "Indemnizaciones de hasta 66 meses",
                original: "Se pagarán indemnizaciones hasta por sesenta y seis (66) meses de salario para todos los trabajadores afectados por cualquier decisión empresarial.",
                resumen: "Propone que la empresa pueda verse obligada a pagar hasta 66 meses de salario a cualquier trabajador afectado por decisiones que tome la compañía.",
                problemas: `
                    <ul style="text-align:left;font-size:0.9rem;">
                        <li>La cifra es muy superior a lo que contempla la legislación laboral colombiana y la práctica normal de la negociación colectiva.</li>
                        <li>No diferencia entre tipos de casos ni niveles de afectación; se plantea como una obligación general para “todos”.</li>
                        <li>Financieramente es inasumible para cualquier empresa y hace que el pliego parezca una lista de exigencias irreales más que una propuesta negociable.</li>
                    </ul>
                `
            },
            en: {
                titulo: "Severance payments of up to 66 months",
                original: "Severance of up to sixty-six (66) months of salary will be paid to all workers affected by any business decision.",
                resumen: "It suggests that the company could be forced to pay up to 66 months of salary to any worker affected by decisions taken by the company.",
                problemas: `
                    <ul style="text-align:left;font-size:0.9rem;">
                        <li>The amount is far above what Colombian labour law and normal collective bargaining practice usually allow.</li>
                        <li>It does not distinguish between different situations or levels of impact; it appears as a general obligation for “all” workers.</li>
                        <li>From a financial perspective, it is unrealistic and makes the agreement look more like a list of impossible demands than a serious negotiation proposal.</li>
                    </ul>
                `
            }
        }
    },
    {
        nivel: 4,
        texts: {
            es: {
                titulo: "Entrega del 50 % de las tierras con infraestructura completa",
                original: "Las empresas entregarán el cincuenta por ciento (50 %) de las tierras intervenidas con todos los servicios públicos, riego, vías y demás infraestructura requerida para proyectos productivos.",
                resumen: "Plantea que la mitad de las tierras intervenidas, ya dotadas con servicios y vías, debe ser entregada para otros proyectos.",
                problemas: `
                    <ul style="text-align:left;font-size:0.9rem;">
                        <li>Da por hecho un porcentaje fijo (50 %) sin ningún sustento técnico ni justificación económica.</li>
                        <li>No define criterios de selección, tipo de proyectos, ni la corresponsabilidad del Estado y otros actores.</li>
                        <li>Se parece más a un reparto anticipado de activos que a un acuerdo ordenado de cierre o transición.</li>
                    </ul>
                `
            },
            en: {
                titulo: "Transfer of 50% of lands with full infrastructure",
                original: "Companies shall transfer fifty percent (50%) of the intervened lands with all public services, irrigation, roads and any infrastructure required for productive projects.",
                resumen: "It assumes that half of the intervened lands, already equipped with services and roads, must be transferred to other projects.",
                problemas: `
                    <ul style="text-align:left;font-size:0.9rem;">
                        <li>It fixes a 50% share with no technical basis or economic justification.</li>
                        <li>There are no criteria for land selection, project type or shared responsibility with the State and other stakeholders.</li>
                        <li>It looks more like an advance distribution of assets than a realistic and orderly transition arrangement.</li>
                    </ul>
                `
            }
        }
    },
    {
        nivel: 4,
        texts: {
            es: {
                titulo: "Entrega de maquinaria pesada, puertos y activos mayores",
                original: "Las empresas deberán entregar maquinaria pesada, bandas, puertos, aeropuertos, locomotoras, remolcadores y demás activos que se consideren necesarios para los proyectos de diversificación.",
                resumen: "Pretende que las empresas entreguen maquinaria pesada e infraestructura estratégica para otros proyectos de diversificación.",
                problemas: `
                    <ul style="text-align:left;font-size:0.9rem;">
                        <li>Habla de entrega de activos estratégicos sin un análisis de viabilidad técnica, jurídica o de seguridad.</li>
                        <li>No diferencia entre equipos obsoletos, en desuso o activos clave para la operación actual.</li>
                        <li>Refuerza la idea de “vaciar” a las empresas de su patrimonio físico, más que construir mecanismos concretos para aprovechar algunos activos de forma responsable.</li>
                    </ul>
                `
            },
            en: {
                titulo: "Transfer of heavy machinery, ports and major assets",
                original: "Companies shall hand over heavy machinery, conveyor belts, ports, airports, locomotives, tugboats and any other assets considered necessary for diversification projects.",
                resumen: "It demands that companies hand over heavy machinery and strategic infrastructure to be used in diversification projects.",
                problemas: `
                    <ul style="text-align:left;font-size:0.9rem;">
                        <li>It requires the transfer of strategic assets with no technical, legal or safety assessment.</li>
                        <li>It does not distinguish between obsolete or unused equipment and key assets needed for current operations.</li>
                        <li>This feeds the perception of stripping companies of their physical assets rather than designing specific mechanisms to use some of them responsibly.</li>
                    </ul>
                `
            }
        }
    },
    {
        nivel: 3,
        texts: {
            es: {
                titulo: "Educación para la familia extendida",
                original: "Las empresas garantizarán educación técnica, universitaria y de posgrado para los familiares de los trabajadores que sean definidos en los programas de transición.",
                resumen: "Propone que las empresas garanticen estudios técnicos, universitarios y de posgrado para familiares de trabajadores vinculados a la transición.",
                problemas: `
                    <ul style="text-align:left;font-size:0.9rem;">
                        <li>El concepto de “familiares” es amplio y poco definido, lo que abre la puerta a interpretaciones ilimitadas.</li>
                        <li>El verbo “garantizarán” habla de obligación total, sin mencionar cupos, topes económicos ni criterios de priorización.</li>
                        <li>Puede verse como una promesa sin contexto ni sostenibilidad, más cercana a un beneficio político que a una política educativa seria.</li>
                    </ul>
                `
            },
            en: {
                titulo: "Education for extended family members",
                original: "Companies shall guarantee technical, university and postgraduate education for workers’ family members defined within the transition programmes.",
                resumen: "It suggests that companies should guarantee technical, university and postgraduate education for relatives of workers involved in transition programmes.",
                problemas: `
                    <ul style="text-align:left;font-size:0.9rem;">
                        <li>The term “family members” is broad and undefined, leaving room for unlimited interpretations.</li>
                        <li>The verb “shall guarantee” implies a total obligation with no mention of quotas, financial ceilings or priority criteria.</li>
                        <li>It may look more like an open-ended promise than a realistic and sustainable education policy.</li>
                    </ul>
                `
            }
        }
    },
    {
        nivel: 4,
        texts: {
            es: {
                titulo: "Cotizaciones indefinidas en salud y pensión",
                original: "Las empresas continuarán realizando las cotizaciones en salud y pensión hasta que el trabajador consiga empleo o sea ubicado en cualquier programa de reconversión.",
                resumen: "Plantea que las empresas sigan pagando salud y pensión incluso después de terminar el contrato, hasta que la persona consiga otro empleo o entre a algún programa.",
                problemas: `
                    <ul style="text-align:left;font-size:0.9rem;">
                        <li>No establece ningún límite de tiempo, lo que vuelve la obligación potencialmente indefinida.</li>
                        <li>La expresión “cualquier programa de reconversión” es vaga y no exige condiciones mínimas de calidad o duración.</li>
                        <li>Genera una carga económica impredecible que ninguna empresa puede asumir sin poner en riesgo su estabilidad financiera.</li>
                    </ul>
                `
            },
            en: {
                titulo: "Open-ended health and pension contributions",
                original: "Companies will continue paying health and pension contributions until the worker finds a new job or is placed in any retraining programme.",
                resumen: "It proposes that companies keep paying health and pension contributions even after the contract ends, until the person finds another job or joins some programme.",
                problemas: `
                    <ul style="text-align:left;font-size:0.9rem;">
                        <li>There is no time limit, which turns the obligation into something potentially indefinite.</li>
                        <li>The phrase “any retraining programme” is vague and does not require basic quality or duration standards.</li>
                        <li>It creates an unpredictable financial burden that no company can realistically carry without jeopardising its sustainability.</li>
                    </ul>
                `
            }
        }
    },
    {
        nivel: 3,
        texts: {
            es: {
                titulo: "Condonación total de deudas internas",
                original: "Se condonarán todas las deudas, préstamos y obligaciones económicas que los trabajadores tengan con la empresa.",
                resumen: "Pide que la empresa perdone todas las deudas que los trabajadores tengan con ella, sin distinción.",
                problemas: `
                    <ul style="text-align:left;font-size:0.9rem;">
                        <li>La expresión “todas las deudas” no distingue entre tipos de créditos ni montos, planteando un perdón generalizado.</li>
                        <li>Desconoce la corresponsabilidad de quien recibió el préstamo y puede percibirse como una medida poco justa frente a otros trabajadores.</li>
                        <li>Debilita los incentivos de cumplimiento y envía un mensaje de que las obligaciones financieras internas pueden desaparecer por presión política.</li>
                    </ul>
                `
            },
            en: {
                titulo: "Full cancellation of internal debts",
                original: "All debts, loans and economic obligations that workers have with the company shall be cancelled.",
                resumen: "It demands that the company cancel all debts workers have with it, without any distinction.",
                problemas: `
                    <ul style="text-align:left;font-size:0.9rem;">
                        <li>The phrase “all debts” makes no distinction between different types of loans or amounts, implying a blanket cancellation.</li>
                        <li>It ignores the shared responsibility of the person who received the loan and may be perceived as unfair to other workers.</li>
                        <li>It weakens repayment incentives and sends a signal that internal financial obligations can disappear under political pressure.</li>
                    </ul>
                `
            }
        }
    },
    {
        nivel: 3,
        texts: {
            es: {
                titulo: "Prohibición total de la tercerización",
                original: "Las empresas no podrán tercerizar ninguna actividad relacionada con el objeto social principal.",
                resumen: "Busca prohibir por completo la tercerización en cualquier actividad relacionada con el objeto social de la empresa.",
                problemas: `
                    <ul style="text-align:left;font-size:0.9rem;">
                        <li>La palabra “ninguna” convierte la cláusula en una prohibición absoluta, sin espacio para excepciones razonables.</li>
                        <li>No diferencia entre tercerización precaria y contratación legítima de servicios altamente especializados.</li>
                        <li>Dificulta operaciones complejas donde se requiere apoyo externo técnico, jurídico o tecnológico.</li>
                    </ul>
                `
            },
            en: {
                titulo: "Total ban on outsourcing",
                original: "Companies shall not outsource any activity related to the main corporate purpose.",
                resumen: "It seeks to completely ban outsourcing for any activity related to the company’s core business.",
                problemas: `
                    <ul style="text-align:left;font-size:0.9rem;">
                        <li>The expression “any activity” turns it into an absolute ban, leaving no room for reasonable exceptions.</li>
                        <li>It does not distinguish between abusive forms of outsourcing and legitimate, highly specialised services.</li>
                        <li>It makes complex operations harder, especially when technical, legal or technological external support is actually needed.</li>
                    </ul>
                `
            }
        }
    },
    {
        nivel: 2,
        texts: {
            es: {
                titulo: "Centros de cuidado financiados por las empresas",
                original: "Las empresas crearán y mantendrán centros de cuidado para niños, personas mayores y personas con discapacidad.",
                resumen: "Propone que las empresas creen y sostengan centros de cuidado para niños, adultos mayores y personas con discapacidad.",
                problemas: `
                    <ul style="text-align:left;font-size:0.9rem;">
                        <li>Atribuye a las empresas la responsabilidad principal y permanente de un servicio que normalmente es compartido con el Estado y otros actores.</li>
                        <li>El verbo “mantendrán” sugiere una obligación indefinida en el tiempo, sin aclarar alcances ni límites.</li>
                        <li>Sin un diseño claro de financiación y gobernanza, puede convertirse en una carga poco realista más que en una política de cuidado sostenible.</li>
                    </ul>
                `
            },
            en: {
                titulo: "Care centres financed by companies",
                original: "Companies shall create and maintain care centres for children, older persons and persons with disabilities.",
                resumen: "It proposes that companies create and sustain care centres for children, older persons and persons with disabilities.",
                problemas: `
                    <ul style="text-align:left;font-size:0.9rem;">
                        <li>It places the main and permanent responsibility on companies for a service that is usually shared with the State and other actors.</li>
                        <li>The verb “shall maintain” suggests an obligation with no clear time frame or limits.</li>
                        <li>Without a clear design for funding and governance, it risks becoming an unrealistic burden rather than a sustainable care policy.</li>
                    </ul>
                `
            }
        }
    },
    {
        nivel: 4,
        texts: {
            es: {
                titulo: "Empleo prácticamente garantizado",
                original: "Las empresas garantizarán la vinculación de los trabajadores en cualquier nuevo proyecto o empresa que llegue al territorio.",
                resumen: "Plantea que las empresas garanticen empleo a los trabajadores en cualquier proyecto nuevo que llegue a la zona.",
                problemas: `
                    <ul style="text-align:left;font-size:0.9rem;">
                        <li>Se acerca a la idea de empleo vitalicio, algo que no existe en la normativa laboral actual.</li>
                        <li>No menciona procesos de selección, requisitos de perfil ni criterios mínimos de mérito.</li>
                        <li>Choca con la lógica de contratación responsable y puede ser percibido como una promesa imposible de cumplir.</li>
                    </ul>
                `
            },
            en: {
                titulo: "Virtually guaranteed employment",
                original: "Companies shall guarantee that workers are hired in any new project or company arriving in the territory.",
                resumen: "It assumes that companies will guarantee jobs for workers in any new project that comes into the territory.",
                problemas: `
                    <ul style="text-align:left;font-size:0.9rem;">
                        <li>It comes very close to the idea of lifelong guaranteed employment, which does not exist in current labour law.</li>
                        <li>There is no reference to recruitment processes, job requirements or merit-based criteria.</li>
                        <li>It clashes with the basic logic of responsible hiring and may be seen as an impossible promise.</li>
                    </ul>
                `
            }
        }
    }
];

/* ==========================
   REFERENCIAS A ELEMENTOS
   ========================== */
const analisis = document.getElementById("analisis");
const graficos = document.getElementById("graficos");
const carrusel = document.getElementById("carrusel");
const acciones = document.getElementById("acciones");

/* ==========================
   INICIALIZACIÓN
   ========================== */
window.addEventListener("DOMContentLoaded", () => {
    configurarUI();
    configurarEventos();
});

/* ==========================
   CONFIGURAR TEXTOS UI
   ========================== */
function configurarUI() {
    const t = uiText[currentLang];

    document.getElementById("navTitle").innerHTML = t.navTitle;
    document.getElementById("mainTitle").textContent = t.mainTitle;
    document.getElementById("mainSub").textContent = t.mainSub;
    document.getElementById("btnIniciar").textContent = t.btnIniciar;
    document.getElementById("chartsTitle").textContent = t.chartsTitle;
    document.getElementById("carouselTitle").textContent = t.carouselTitle;
    document.getElementById("btnPDF").textContent = t.btnPDF;
    document.getElementById("btnComparar").textContent = t.btnComparar;
    document.getElementById("footerText").innerHTML = t.footer;
    document.getElementById("modoBtn").textContent = t.modoLabel;

    document.querySelectorAll(".lang-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.lang === currentLang);
    });
}

/* ==========================
   EVENTOS PRINCIPALES
   ========================== */
function configurarEventos() {
    document.getElementById("btnIniciar").addEventListener("click", () => iniciarAnalisis());

    document.getElementById("btnPDF").addEventListener("click", () => {
        const fileName = uiText[currentLang].pdfFileName;
        html2pdf().set({ filename: fileName }).from(document.body).save();
    });

    document.getElementById("btnComparar").addEventListener("click", () => {
        const t = uiText[currentLang];
        Swal.fire({
            title: t.compararTitulo,
            html: t.compararContenido,
            icon: t.compararIcon,
            confirmButtonColor: "#c9a227",
            background: "#111",
            color: "#fff"
        });
    });

    document.getElementById("modoBtn").addEventListener("click", () => {
        document.body.classList.toggle("light");
    });

    document.querySelectorAll(".lang-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const lang = btn.dataset.lang;
            if (lang !== currentLang) {
                currentLang = lang;
                localStorage.setItem("lang", currentLang);
                configurarUI();
                if (!analisis.classList.contains("hidden")) {
                    iniciarAnalisis(true);
                }
            }
        });
    });
}

/* ==========================
   INICIAR / RENDERIZAR ANÁLISIS
   ========================== */
function iniciarAnalisis(reRender = false) {
    analisis.classList.remove("hidden");
    graficos.classList.remove("hidden");
    carrusel.classList.remove("hidden");
    acciones.classList.remove("hidden");

    analisis.innerHTML = "";
    const t = uiText[currentLang];

    puntos.forEach(p => {
        const data = p.texts[currentLang];

        const card = document.createElement("div");
        card.className = "card";
        card.setAttribute("data-aos", "fade-up");

        // En la tarjeta mostramos el resumen (qué pide el punto en sencillo)
        card.innerHTML = `
            <h3>${data.titulo}</h3>
            <p>${data.resumen}</p>
        `;

        // Al hacer clic: original + resumen + problemas
        card.addEventListener("click", () => {
            Swal.fire({
                title: data.titulo,
                html: `
                    <h4 style="color:#c9a227;margin-top:10px;">${t.modalOriginal}</h4>
                    <p style="font-size:0.9rem;">${data.original}</p>
                    <hr style="border-color:#444;margin:10px 0;">
                    <h4 style="color:#c9a227;margin-top:10px;">${t.modalExplicacion}</h4>
                    <p style="font-size:0.9rem;">${data.resumen}</p>
                    <hr style="border-color:#444;margin:10px 0;">
                    <h4 style="color:#c9a227;margin-top:10px;">${t.modalProblemas}</h4>
                    ${data.problemas}
                `,
                icon: "info",
                background: "#111",
                color: "#fff",
                confirmButtonColor: "#c9a227"
            });
        });

        analisis.appendChild(card);
    });

    AOS.refreshHard();
    generarGrafico();
    generarCarrusel();
}

/* ==========================
   GRÁFICO APEXCHARTS
   ========================== */
function generarGrafico() {
    const labels = puntos.map(p => p.texts[currentLang].titulo);
    const data = puntos.map(p => p.nivel);

    if (chartInstance) {
        chartInstance.destroy();
    }

    const options = {
        chart: { type: "radar", toolbar: { show: false } },
        series: [{
            name: currentLang === "es" ? "Nivel de problema" : "Problem level",
            data
        }],
        labels,
        colors: ["#c9a227"],
        yaxis: { max: 4, min: 1, tickAmount: 3 }
    };

    chartInstance = new ApexCharts(document.querySelector("#chart"), options);
    chartInstance.render();
}

/* ==========================
   CARRUSEL SWIPER
   ========================== */
function generarCarrusel() {
    const wrapper = document.getElementById("swiperWrapper");
    wrapper.innerHTML = "";

    puntos.forEach(p => {
        const data = p.texts[currentLang];
        const slide = document.createElement("div");
        slide.className = "swiper-slide";
        slide.textContent = data.titulo;
        wrapper.appendChild(slide);
    });

    if (swiperInstance) {
        swiperInstance.destroy(true, true);
    }

    swiperInstance = new Swiper(".swiper", {
        effect: "slide",
        autoplay: { delay: 2500 },
        loop: true
    });
}
