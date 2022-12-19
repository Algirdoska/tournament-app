<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\Tournament;
use Illuminate\Http\Request;

class TeamController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $teams = Team::all()->load('tournaments:name');

        return $teams;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $request->validate([
            'name' => 'required|string',
        ]);

        $team = Team::create($request->all());

        // foreach ($request->categories as $id) {
        //     Category::findOrFail($id);
        //     $tournament->categories()->attach($id);
        // }

        // $tournament = $tournament->load('categories:title');

        return $team;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Team $team)
    {

        $team = $team->load('tournaments:name');

        return $team;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Team $team)
    {
        $request->validate([
            'name' => 'required|string',
            'tournaments' => 'nullable|array',
        ]);

        $tournaments = [];
        if ($request->tournaments != null)
            foreach ($request->tournaments as $id) {
                Tournament::findOrFail($id);
                array_push($tournaments, $id);
            }

        $team->tournaments()->sync($tournaments);

        $team->update($request->all());

        $team = $team->load('tournaments:name');
        return $team;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Team $team)
    {
        $team->delete();
    }
}
