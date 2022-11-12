<?php

namespace App\Http\Controllers;

use App\Models\CampaignAnalysis;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CampaignAnalysisController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('CampaignAnalysis');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CampaignAnalysis  $campaignAnalysis
     * @return \Illuminate\Http\Response
     */
    public function show(CampaignAnalysis $campaignAnalysis)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\CampaignAnalysis  $campaignAnalysis
     * @return \Illuminate\Http\Response
     */
    public function edit(CampaignAnalysis $campaignAnalysis)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CampaignAnalysis  $campaignAnalysis
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CampaignAnalysis $campaignAnalysis)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CampaignAnalysis  $campaignAnalysis
     * @return \Illuminate\Http\Response
     */
    public function destroy(CampaignAnalysis $campaignAnalysis)
    {
        //
    }
}
